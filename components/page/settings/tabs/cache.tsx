"use client";

import { useEffect, useState, useCallback, memo, useRef } from "react";
import {
  FiRefreshCw,
  FiClock,
  FiLayers,
} from "react-icons/fi";
import {
  revalidateSubjects,
  revalidateTopics,
  revalidateNotes,
  revalidateUsers,
  revalidateBadges,
  revalidateAll,
} from "@/lib/revalidate";
import { getCacheCounts } from "@/lib/actions/cache";
import "./cache.css";

// Cache durations in seconds
const CACHE_DURATIONS = {
  subjects: 7200, // 2h
  topics: 7200, // 2h
  notes: 3600, // 1h
  users: 3600, // 1h
  badges: 28800, // 8h
};

// Types
type CacheKey = keyof typeof CACHE_DURATIONS;

interface CacheCardProps {
  cacheKey: CacheKey;
  label: string;
  duration: number;
  count: number;
  onRefresh: (key: CacheKey, action: () => Promise<void>, label: string) => Promise<void>;
  loading: string | null;
  action: () => Promise<void>;
  lastRefreshKey: number; // Trigger to reset timer
}

// Helper to format time (hours and minutes only for better performance)
const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

// Helper to get initial time left (in minutes for less frequent updates)
const getInitialTimeLeft = (cacheKey: string, duration: number): number => {
  if (typeof window === 'undefined') return Math.floor(duration / 60);
  const storageKey = `nexera_cache_last_${cacheKey}`;
  const lastRefreshed = localStorage.getItem(storageKey);
  if (!lastRefreshed) {
    localStorage.setItem(storageKey, Date.now().toString());
    return Math.floor(duration / 60);
  }
  const elapsedMinutes = Math.floor((Date.now() - parseInt(lastRefreshed)) / 60000);
  return Math.max(0, Math.floor(duration / 60) - elapsedMinutes);
};

/**
 * Individual Cache Card Component - Memoized and manages its own timer
 * Updates once per minute instead of every second for better performance
 */
const CacheCard = memo(function CacheCard({
  cacheKey,
  label,
  duration,
  count,
  onRefresh,
  loading,
  action,
  lastRefreshKey,
}: CacheCardProps) {
  // Timer stored in MINUTES for less frequent updates (60x fewer re-renders)
  const [timeLeftMinutes, setTimeLeftMinutes] = useState(() => getInitialTimeLeft(cacheKey, duration));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const durationMinutes = Math.floor(duration / 60);

  // Setup timer that updates once per MINUTE (not every second)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeftMinutes(prev => {
        if (prev <= 1) {
          // Reset timer when it hits 0
          localStorage.setItem(`nexera_cache_last_${cacheKey}`, Date.now().toString());
          return durationMinutes;
        }
        return prev - 1;
      });
    }, 60000); // Update every 60 seconds instead of every 1 second

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cacheKey, duration, durationMinutes]);

  // Reset timer when lastRefreshKey changes (after manual refresh)
  useEffect(() => {
    if (lastRefreshKey > 0) {
      setTimeLeftMinutes(durationMinutes);
    }
  }, [lastRefreshKey, durationMinutes]);

  // Convert minutes back to seconds for display and progress
  const timeLeftSeconds = timeLeftMinutes * 60;
  const progressWidth = `${(timeLeftMinutes / durationMinutes) * 100}%`;
  
  // Determine freshness color
  const percentage = timeLeftMinutes / durationMinutes;
  let statusColor = "var(--danger-soft)";
  if (percentage > 0.66) statusColor = "var(--success-soft)";
  else if (percentage > 0.33) statusColor = "var(--badge-05-bg)";

  const isLoading = loading === cacheKey;

  return (
    <div className="cacheCard">
      <div className="cardTop">
        <label className="cardLabel">{label}</label>
        <span className="badgeCount" title={`${count} items cached`}>
          <FiLayers /> {count} items
        </span>
      </div>

      <div className="timerDisplay">
        <div className="timerText">
          <FiClock /> {formatTime(timeLeftSeconds)}
        </div>
        <div className="progressBg">
          <div 
            className="progressBar" 
            style={{ width: progressWidth, background: statusColor }} 
          />
        </div>
      </div>

      <p className="cacheInfo">
        Auto-refreshes every {duration / 3600}h.
      </p>

      <button
        className={`refreshBtn ${isLoading ? 'loading' : ''}`}
        onClick={() => onRefresh(cacheKey, action, label)}
        disabled={loading !== null}
        title={`Refresh ${label} cache`}
      >
        <FiRefreshCw className={isLoading ? "spin" : ""} />
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
});

export default function CacheSettings() {
  const [loading, setLoading] = useState<string | null>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    subjects: 0,
    topics: 0,
    notes: 0,
    users: 0,
    badges: 0,
  });
  // Track refresh events to notify cards
  const [refreshKeys, setRefreshKeys] = useState<{ [key: string]: number }>({
    subjects: 0,
    topics: 0,
    notes: 0,
    users: 0,
    badges: 0,
  });

  // Fetch document counts - only once on mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getCacheCounts();
        setCounts(data);
      } catch (err) {
        console.error("Failed to fetch cache counts:", err);
      }
    };
    fetchCounts();
  }, []);


  // Fetch counts (for refresh)
  const fetchCounts = useCallback(async () => {
    try {
      const data = await getCacheCounts();
      setCounts(data);
    } catch (err) {
      console.error("Failed to fetch cache counts:", err);
    }
  }, []);

  // Reset timer and notify cards
  const resetTimer = useCallback((key: string) => {
    const now = Date.now();
    if (key === "all") {
      Object.keys(CACHE_DURATIONS).forEach((k) =>
        localStorage.setItem(`nexera_cache_last_${k}`, now.toString())
      );
      setRefreshKeys(prev => {
        const updated = { ...prev };
        Object.keys(CACHE_DURATIONS).forEach(k => {
          updated[k] = prev[k] + 1;
        });
        return updated;
      });
    } else {
      localStorage.setItem(`nexera_cache_last_${key}`, now.toString());
      setRefreshKeys(prev => ({ ...prev, [key]: prev[key] + 1 }));
    }
  }, []);

  const handleRefresh = useCallback(async (
    key: string,
    action: () => Promise<void>,
    label: string
  ) => {
    setLoading(key);
    try {
      await action();
      resetTimer(key);
      await fetchCounts();
    } catch (error) {
      console.error(`Failed to refresh ${label}:`, error);
      alert(`Failed to refresh ${label}. Check console for details.`);
    } finally {
      setLoading(null);
    }
  }, [resetTimer, fetchCounts]);

  return (
    <div className="preferencesSection">
      <div className="prefGrid">
        <div className="prefCard fullWidth infoBanner">
          <div className="cardHeader">
            <div>
              <h3>Cache Management</h3>
              <p>
                Monitor auto-refresh cycles, check data volume, and force-refresh server caches.
              </p>
            </div>
          </div>
        </div>

        <div className="cardsGrid fullWidth">
            <CacheCard 
                cacheKey="subjects"
                label="Subjects"
                duration={CACHE_DURATIONS.subjects}
                count={counts.subjects}
                loading={loading}
                lastRefreshKey={refreshKeys.subjects}
                onRefresh={handleRefresh}
                action={revalidateSubjects}
            />
             <CacheCard 
                cacheKey="topics"
                label="Topics"
                duration={CACHE_DURATIONS.topics}
                count={counts.topics}
                loading={loading}
                lastRefreshKey={refreshKeys.topics}
                onRefresh={handleRefresh}
                action={revalidateTopics}
            />
             <CacheCard 
                cacheKey="notes"
                label="Notes"
                duration={CACHE_DURATIONS.notes}
                count={counts.notes}
                loading={loading}
                lastRefreshKey={refreshKeys.notes}
                onRefresh={handleRefresh}
                action={revalidateNotes}
            />
             <CacheCard 
                cacheKey="users"
                label="Users"
                duration={CACHE_DURATIONS.users}
                count={counts.users}
                loading={loading}
                lastRefreshKey={refreshKeys.users}
                onRefresh={handleRefresh}
                action={revalidateUsers}
            />
             <CacheCard 
                cacheKey="badges"
                label="Badges"
                duration={CACHE_DURATIONS.badges}
                count={counts.badges}
                loading={loading}
                lastRefreshKey={refreshKeys.badges}
                onRefresh={handleRefresh}
                action={revalidateBadges}
            />
        </div>

        {/* Global Actions */}
        <div className="prefCard fullWidth">
          <div>
              <label>Global Actions</label>
              <p className="textMuted textSm">
                  Refresh all cached data at once.
              </p>
          </div>
          
          <button
            className="primaryBtn"
            onClick={() =>
              handleRefresh("all", () => revalidateAll(), "All Caches")
            }
            disabled={loading !== null}
          >
            <FiRefreshCw className={loading === "all" ? "spin" : ""} />
            {loading === "all" ? "Refreshing..." : "Refresh All Caches"}
          </button>
        </div>
      </div>
    </div>
  );
}
