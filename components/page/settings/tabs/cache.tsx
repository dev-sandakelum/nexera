"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FiRefreshCw,
  FiDatabase,
  FiTrash2,
  FiClock,
  FiRotateCcw,
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
  timeLeft: number;
  action: () => Promise<void>;
}

/**
 * Individual Cache Card Component
 */
function CacheCard({
  cacheKey,
  label,
  duration,
  count,
  onRefresh,
  loading,
  timeLeft,
  action,
}: CacheCardProps) {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const getProgressWidth = () => {
    const percentage = (timeLeft / duration) * 100;
    return `${percentage}%`;
  };

  // Determine freshness color
  const getStatusColor = () => {
    const percentage = timeLeft / duration;
    if (percentage > 0.66) return "var(--success-soft)"; // Fresh
    if (percentage > 0.33) return "var(--badge-05-bg)"; // Medium
    return "var(--danger-soft)"; // Stale
  };

  return (
    <div className="prefCard cache-card">
      <div className="card-top">
        <label className="card-label">{label}</label>
        <span className="badge-count" title={`${count} items cached`}>
          <FiLayers /> {count} items
        </span>
      </div>

      <div className="timer-display">
        <div className="timer-text">
          <FiClock /> {formatTime(timeLeft)}
        </div>
        <div className="progress-bg">
          <div 
            className="progress-bar" 
            style={{ 
              width: getProgressWidth(),
              background: getStatusColor()
            }} 
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Auto-refreshes every {duration / 3600}h.
      </p>

      <button
        className="refreshBtn"
        onClick={() => onRefresh(cacheKey, action, label)}
        disabled={loading !== null}
        title={`Refresh ${label} cache`}
      >
        <FiRefreshCw className={loading === cacheKey ? "spin" : ""} />
        {loading === cacheKey ? "Refreshing..." : "Refresh"}
      </button>

      <style jsx>{`
        .cache-card {
            background: var(--background);
            border: 1px solid var(--theme-colorE75);
            border-radius: 12px;
            padding: 1.25rem;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
        }
        .cache-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border-color: var(--accent);
        }
        .card-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        .card-label {
            font-size: 1rem;
            font-weight: 600;
            color: var(--theme-colorB);
        }
        .badge-count {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.75rem;
            background: var(--bg-secondary);
            padding: 0.25rem 0.6rem;
            border-radius: 20px;
            color: var(--text-secondary);
            font-weight: 500;
        }
        .timer-display {
            margin-bottom: 1rem;
        }
        .timer-text {
            font-family: monospace;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--theme-colorB);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .progress-bg {
            width: 100%;
            height: 4px;
            background: var(--theme-colorE75);
            border-radius: 2px;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            transition: width 1s linear, background 0.3s;
        }
        .refreshBtn {
            background: var(--bg-secondary);
            color: var(--theme-colorB);
            border: 1px solid var(--border);
            padding: 0.6rem;
            border-radius: 8px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        .refreshBtn:hover:not(:disabled) {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
        }
        .refreshBtn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .text-sm { font-size: 0.8rem; }
        .text-gray-500 { color: var(--text-secondary); opacity: 0.8; }
        .mb-4 { margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}

export default function CacheSettings() {
  const [loading, setLoading] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    subjects: 0,
    topics: 0,
    notes: 0,
    users: 0,
    badges: 0,
  });

  // Calculate time remaining based on stored "last refreshed" timestamp
  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const newTimeLeft: { [key: string]: number } = {};

    Object.entries(CACHE_DURATIONS).forEach(([key, duration]) => {
      const storageKey = `nexera_cache_last_${key}`;
      let lastRefreshed = localStorage.getItem(storageKey);

      if (!lastRefreshed) {
        lastRefreshed = now.toString();
        localStorage.setItem(storageKey, lastRefreshed);
      }

      const elapsedSeconds = Math.floor((now - parseInt(lastRefreshed)) / 1000);
      const remaining = Math.max(0, duration - elapsedSeconds);
      
      // Auto-reset check
      if (remaining === 0) {
         localStorage.setItem(storageKey, now.toString());
         newTimeLeft[key] = duration;
      } else {
         newTimeLeft[key] = remaining;
      }
    });
    return newTimeLeft;
  }, []);

  // Fetch document counts
  const fetchCounts = async () => {
      try {
          const data = await getCacheCounts();
          setCounts(data);
      } catch (err) {
          console.error("Failed to fetch cache counts:", err);
      }
  };

  useEffect(() => {
    // Initial load
    setTimeLeft(calculateTimeLeft());
    fetchCounts();

    // Timer interval
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);


  const handleResetTimer = (key: string) => {
      if (key === "all") {
        const now = Date.now();
        Object.keys(CACHE_DURATIONS).forEach((k) =>
          localStorage.setItem(`nexera_cache_last_${k}`, now.toString())
        );
        setTimeLeft(calculateTimeLeft());
      } else {
        localStorage.setItem(`nexera_cache_last_${key}`, Date.now().toString());
        setTimeLeft(prev => ({
            ...prev,
            [key]: CACHE_DURATIONS[key as keyof typeof CACHE_DURATIONS]
        }));
      }
  };

  const handleRefresh = async (
    key: string,
    action: () => Promise<void>,
    label: string
  ) => {
    setLoading(key);
    try {
      await action();
      // Reset timer
      handleResetTimer(key === "all" ? "all" : key);
      
      // Refresh counts too (might have changed)
      await fetchCounts();

    } catch (error) {
      console.error(`Failed to refresh ${label}:`, error);
      alert(`Failed to refresh ${label}. Check console for details.`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="preferencesSection">
      <div className="prefGrid">
        <div className="prefCard fullWidth info-banner">
          <div className="cardHeader">
            {/* <FiDatabase className="cardIcon" /> */}
            <div>
              <h3>Cache Management</h3>
              <p>
                Monitor auto-refresh cycles, check data volume, and force-refresh server caches.
              </p>
            </div>
          </div>
        </div>

        <div className="cards-grid fullWidth">
            <CacheCard 
                cacheKey="subjects"
                label="Subjects"
                duration={CACHE_DURATIONS.subjects}
                count={counts.subjects}
                loading={loading}
                timeLeft={timeLeft.subjects || 0}
                onRefresh={handleRefresh}
                action={revalidateSubjects}
            />
             <CacheCard 
                cacheKey="topics"
                label="Topics"
                duration={CACHE_DURATIONS.topics}
                count={counts.topics}
                loading={loading}
                timeLeft={timeLeft.topics || 0}
                onRefresh={handleRefresh}
                action={revalidateTopics}
            />
             <CacheCard 
                cacheKey="notes"
                label="Notes"
                duration={CACHE_DURATIONS.notes}
                count={counts.notes}
                loading={loading}
                timeLeft={timeLeft.notes || 0}
                onRefresh={handleRefresh}
                action={revalidateNotes}
            />
             <CacheCard 
                cacheKey="users"
                label="Users"
                duration={CACHE_DURATIONS.users}
                count={counts.users}
                loading={loading}
                timeLeft={timeLeft.users || 0}
                onRefresh={handleRefresh}
                action={revalidateUsers}
            />
             <CacheCard 
                cacheKey="badges"
                label="Badges"
                duration={CACHE_DURATIONS.badges}
                count={counts.badges}
                loading={loading}
                timeLeft={timeLeft.badges || 0}
                onRefresh={handleRefresh}
                action={revalidateBadges}
            />
        </div>

        {/* Global Actions */}
        <div className="prefCard fullWidth" style={{ marginTop: "1rem" }}>
          <div className="flex-between">
              <div>
                <label>Global Actions</label>
                <p className="text-sm text-gray-500">
                    Bulk operations for all cached data.
                </p>
              </div>
          </div>
          
          <div className="action-row">
             <button
              className="secondaryBtn"
              onClick={() => handleResetTimer("all")}
              title="Reset All Timers Locally"
            >
              <FiRotateCcw /> Reset Timers
            </button>
            <button
              className="deleteBtn"
              onClick={() =>
                handleRefresh("all", () => revalidateAll(), "All Caches")
              }
              disabled={loading !== null}
            >
              <FiTrash2 />{" "}
              {loading === "all" ? "Clearing..." : "Clear All & Refresh"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fullWidth {
          grid-column: 1 / -1;
        }
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }
        .info-banner {
            background: var(--bg-secondary);
            border: none;
        }
        .cardHeader {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .cardIcon {
          font-size: 1.5rem;
          color: var(--accent);
        }
        .text-sm {
          font-size: 0.875rem;
        }
        .text-gray-500 {
          color: var(--text-secondary);
          opacity: 0.8;
        }
        .action-row {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        .deleteBtn {
            background: var(--danger-soft);
            color: var(--danger);
            border: 1px solid var(--danger-border);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            width: 100%;
            justify-content: center;
            transition: all 0.2s;
        }
        .deleteBtn:hover:not(:disabled) {
            background: var(--danger);
            color: white;
        }
         .secondaryBtn {
            background: transparent;
            color: var(--text-primary);
            border: 1px solid var(--border);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            width: 100%;
            justify-content: center;
            transition: all 0.2s;
        }
        .secondaryBtn:hover {
            background: var(--bg-secondary);
            border-color: var(--text-secondary);
        }
        .secondaryBtn:disabled, .deleteBtn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        @media (max-width: 768px) {
            .cards-grid {
                grid-template-columns: 1fr;
            }
            .action-row {
                flex-direction: column;
            }
        }
      `}</style>
    </div>
  );
}
