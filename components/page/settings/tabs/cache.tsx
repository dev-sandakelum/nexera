"use client";

import { useEffect, useState } from "react";
import {
  FiRefreshCw,
  FiDatabase,
  FiTrash2,
  FiClock,
  FiRotateCcw,
} from "react-icons/fi";
import {
  revalidateSubjects,
  revalidateTopics,
  revalidateNotes,
  revalidateUsers,
  revalidateBadges,
  revalidateAll,
} from "@/lib/revalidate";

// Cache durations in seconds
const CACHE_DURATIONS = {
  subjects: 7200, // 2h
  topics: 7200, // 2h
  notes: 3600, // 1h
  users: 3600, // 1h
  badges: 28800, // 8h
};

export default function CacheSettings() {
  const [loading, setLoading] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Initialize or load random offsets/last refreshed from local storage to simulate "server time"
    const loadTimers = () => {
      const now = Date.now();
      const newTimeLeft: { [key: string]: number } = {};

      Object.entries(CACHE_DURATIONS).forEach(([key, duration]) => {
        const storageKey = `nexera_cache_last_${key}`;
        let lastRefreshed = localStorage.getItem(storageKey);

        if (!lastRefreshed) {
          lastRefreshed = now.toString();
          localStorage.setItem(storageKey, lastRefreshed);
        }

        const elapsedSeconds = Math.floor(
          (now - parseInt(lastRefreshed)) / 1000
        );
        const remaining = Math.max(0, duration - elapsedSeconds);
        newTimeLeft[key] = remaining;
      });

      setTimeLeft(newTimeLeft);
    };

    loadTimers();

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (updated[key] > 0) {
            updated[key] -= 1;
          } else {
            // Auto "reset" the timer loop visually
            updated[key] =
              CACHE_DURATIONS[key as keyof typeof CACHE_DURATIONS];
            localStorage.setItem(
              `nexera_cache_last_${key}`,
              Date.now().toString()
            );
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleResetTimer = (key: string) => {
    if (key === "all") {
      const now = Date.now();
      Object.keys(CACHE_DURATIONS).forEach((k) =>
        localStorage.setItem(`nexera_cache_last_${k}`, now.toString())
      );
      const resetTimes: any = {};
      Object.entries(CACHE_DURATIONS).forEach(([k, d]) => (resetTimes[k] = d));
      setTimeLeft(resetTimes);
    } else {
      localStorage.setItem(`nexera_cache_last_${key}`, Date.now().toString());
      setTimeLeft((prev) => ({
        ...prev,
        [key]: CACHE_DURATIONS[key as keyof typeof CACHE_DURATIONS],
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

      alert(`${label} cache fresh & timer reset.`);
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
        <div className="prefCard fullWidth">
          <div className="cardHeader">
            <FiDatabase className="cardIcon" />
            <div>
              <h3>Cache Management</h3>
              <p>
                Monitor auto-refresh cycles and manually invalidate caches.
              </p>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="prefCard">
          <div className="flex-between">
            <label>Subjects</label>
            <div className="timer-container">
              <span className="timerBadge">
                <FiClock /> {formatTime(timeLeft["subjects"] || 0)}
              </span>
              <button
                className="iconBtn"
                onClick={() => handleResetTimer("subjects")}
                title="Reset Timer Only"
              >
                <FiRotateCcw />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Auto-refreshes every 2 hours.
          </p>
          <button
            className="saveBtn"
            onClick={() =>
              handleRefresh("subjects", () => revalidateSubjects(), "Subjects")
            }
            disabled={loading !== null}
          >
            {loading === "subjects" ? "Refreshing..." : "Reset & Refresh"}
          </button>
        </div>

        {/* Topics */}
        <div className="prefCard">
          <div className="flex-between">
            <label>Topics</label>
            <div className="timer-container">
              <span className="timerBadge">
                <FiClock /> {formatTime(timeLeft["topics"] || 0)}
              </span>
              <button
                className="iconBtn"
                onClick={() => handleResetTimer("topics")}
                title="Reset Timer Only"
              >
                <FiRotateCcw />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Auto-refreshes every 2 hours.
          </p>
          <button
            className="saveBtn"
            onClick={() =>
              handleRefresh("topics", () => revalidateTopics(), "Topics")
            }
            disabled={loading !== null}
          >
            {loading === "topics" ? "Refreshing..." : "Reset & Refresh"}
          </button>
        </div>

        {/* Notes */}
        <div className="prefCard">
          <div className="flex-between">
            <label>Notes</label>
            <div className="timer-container">
              <span className="timerBadge">
                <FiClock /> {formatTime(timeLeft["notes"] || 0)}
              </span>
              <button
                className="iconBtn"
                onClick={() => handleResetTimer("notes")}
                title="Reset Timer Only"
              >
                <FiRotateCcw />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Auto-refreshes every 1 hour.
          </p>
          <button
            className="saveBtn"
            onClick={() =>
              handleRefresh("notes", () => revalidateNotes(), "Notes")
            }
            disabled={loading !== null}
          >
            {loading === "notes" ? "Refreshing..." : "Reset & Refresh"}
          </button>
        </div>

        {/* Users */}
        <div className="prefCard">
          <div className="flex-between">
            <label>Users</label>
            <div className="timer-container">
              <span className="timerBadge">
                <FiClock /> {formatTime(timeLeft["users"] || 0)}
              </span>
              <button
                className="iconBtn"
                onClick={() => handleResetTimer("users")}
                title="Reset Timer Only"
              >
                <FiRotateCcw />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Auto-refreshes every 1 hour.
          </p>
          <button
            className="saveBtn"
            onClick={() =>
              handleRefresh("users", () => revalidateUsers(), "Users")
            }
            disabled={loading !== null}
          >
            {loading === "users" ? "Refreshing..." : "Reset & Refresh"}
          </button>
        </div>

        {/* Badges */}
        <div className="prefCard">
          <div className="flex-between">
            <label>Badges</label>
            <div className="timer-container">
              <span className="timerBadge">
                <FiClock /> {formatTime(timeLeft["badges"] || 0)}
              </span>
              <button
                className="iconBtn"
                onClick={() => handleResetTimer("badges")}
                title="Reset Timer Only"
              >
                <FiRotateCcw />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Auto-refreshes every 8 hours.
          </p>
          <button
            className="saveBtn"
            onClick={() =>
              handleRefresh("badges", () => revalidateBadges(), "Badges")
            }
            disabled={loading !== null}
          >
            {loading === "badges" ? "Refreshing..." : "Reset & Refresh"}
          </button>
        </div>

        {/* Actions Row */}
        <div className="prefCard fullWidth" style={{ marginTop: "1rem" }}>
          <label>Global Actions</label>
           <p className="text-sm text-gray-500 mb-4">
            Bulk actions for all caches.
          </p>
          <div className="action-row">
             <button
              className="secondaryBtn"
              onClick={() => handleResetTimer("all")}
              title="Reset All Timers (No Fetch)"
            >
              <FiRotateCcw /> Reset All Timers
            </button>
            <button
              className="deleteBtn"
              onClick={() =>
                handleRefresh("all", () => revalidateAll(), "All Caches")
              }
              disabled={loading !== null}
            >
              <FiTrash2 />{" "}
              {loading === "all" ? "Clearing..." : "Clear All & Reset"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fullWidth {
          grid-column: 1 / -1;
        }
        .cardHeader {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
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
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .text-danger {
          color: var(--danger);
        }
        .flex-between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .timer-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .timerBadge {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-family: monospace;
            background: var(--bg-secondary);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        .iconBtn {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .iconBtn:hover {
            color: var(--accent);
            background: var(--bg-secondary);
        }
        .action-row {
            display: flex;
            gap: 1rem;
        }
        .deleteBtn {
            background: var(--danger-soft);
            color: var(--danger);
            border: 1px solid var(--danger-border);
            padding: 0.5rem 1rem;
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
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border);
            padding: 0.5rem 1rem;
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
            background: var(--border);
        }
        .saveBtn {
             background: var(--accent);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            width: 100%;
            transition: all 0.2s;
        }
        .saveBtn:hover:not(:disabled) {
            opacity: 0.9;
        }
        .saveBtn:disabled, .deleteBtn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
