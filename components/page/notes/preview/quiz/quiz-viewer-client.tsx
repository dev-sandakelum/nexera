"use client";

import { useState, useEffect, useCallback, useRef, CSSProperties } from "react";
import {
  nexNoteAbout,
  nexNoteData,
  quizNote,
  QuizActivityData,
} from "@/components/types";
import "@/components/styles/quiz/main.css";
import QuizNotFound from "./quiz-not-found";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizData {
  [key: string]: QuizQuestion[];
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function QuizViewerClient({
  notesAbout,
  notesData,
  pathname,
  userId,
  savedActivity,
}: {
  notesAbout: nexNoteAbout[];
  notesData: nexNoteData[];
  pathname: string;
  userId?: string;
  savedActivity?: QuizActivityData;
}) {
  const quizSlug = pathname.split("/").pop() || "";
  const quiz = notesAbout.find((n) => n.slug === quizSlug);
  const quizData = notesData.find((n) => n.noteId === quiz?.id);

  const quizUrl =
    quizData?.context && "quizUrl" in quizData.context
      ? (quizData.context as quizNote).quizUrl
      : undefined;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [reviewingPrevious, setReviewingPrevious] = useState(false);

  // Auto-save ref to track latest answers for the interval
  const latestAnswersRef = useRef<(number | null)[]>([]);
  const hasUnsavedChangesRef = useRef(false);

  // ─── Initialization Logic ───────────────────────────────────────────────

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        if (!quizUrl) {
          setError("Quiz URL not found");
          setLoading(false);
          return;
        }

        const response = await fetch(quizUrl);
        if (!response.ok) throw new Error("Failed to load quiz");

        const data: QuizData = await response.json();
        const firstQuizKey = Object.keys(data)[0];

        if (!firstQuizKey || !Array.isArray(data[firstQuizKey])) {
          setError("Invalid quiz data format");
          setLoading(false);
          return;
        }

        const quizQuestions = data[firstQuizKey];
        setQuestions(quizQuestions);

        // ─── Conflict Resolution: DB vs LocalStorage ───
        let initialAnswers = new Array(quizQuestions.length).fill(null);
        let shouldShowResults = false;
        let isReviewMode = false;

        // 1. Check LocalStorage
        let localData: QuizActivityData | null = null;
        if (userId && quiz?.id) {
          try {
            const localRaw = localStorage.getItem(
              `nexera_quiz_${userId}_${quiz.id}`,
            );
            if (localRaw) {
              localData = JSON.parse(localRaw);
            }
          } catch (e) {
            console.error("Failed to parse local storage", e);
          }
        }

        // 2. Decide Source
        // Priority:
        // A. DB says "completed" -> Review Mode (ignore local "in-progress" unless newer completed?)
        //    Actually, if DB is completed, user finished it. Show results.
        // B. DB says "in-progress" vs Local "in-progress" -> Use newer.
        // C. No DB, but Local exists -> Use Local.

        const dbIsCompleted = savedActivity?.status === "completed";
        const localIsNewer =
          localData?.lastUpdated && savedActivity?.lastUpdated
            ? new Date(localData.lastUpdated) >
              new Date(savedActivity.lastUpdated)
            : !!localData;

        if (dbIsCompleted) {
          // Case A: User finished this quiz previously.
          if (savedActivity?.userAnswers?.length === quizQuestions.length) {
            initialAnswers = savedActivity.userAnswers;
            shouldShowResults = true;
            isReviewMode = true;
          }
          // We ignore local data if DB is completed (assumes DB determines "done")
          // Unless we want to support "Retaking locally" but not submitted yet?
          // For simplicity: DB Completed wins -> showing results.
        } else if (localData && (localIsNewer || !savedActivity)) {
          // Case B/C: Local is newer or only source. Resume from local.
          if (localData.userAnswers?.length === quizQuestions.length) {
            initialAnswers = localData.userAnswers;
            // If local says completed (but not synced?), show results
            if (localData.status === "completed") {
              shouldShowResults = true;
              isReviewMode = true;
            }
          }
        } else if (savedActivity) {
          // Case D: Syncing in-progress from DB (e.g. other device)
          initialAnswers = savedActivity.userAnswers || initialAnswers;
        }

        setUserAnswers(initialAnswers);
        latestAnswersRef.current = initialAnswers;

        if (shouldShowResults) {
          setReviewingPrevious(true);
          setShowResults(true);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz");
        setLoading(false);
      }
    };

    loadQuizData();
  }, [quizUrl, savedActivity, userId, quiz?.id]);

  // ─── Save Logic ──────────────────────────────────────────────────────────

  const saveToApi = useCallback(
    async (answers: (number | null)[], status: "in-progress" | "completed") => {
      if (!userId || !quiz?.id) return;

      // Calculate ephemeral score for the save
      const currentScore = answers.reduce<number>((acc, ans, idx) => {
        return ans === questions[idx]?.correctIndex ? acc + 1 : acc;
      }, 0);
      const total = questions.length;
      const percentage =
        total > 0 ? ((currentScore / total) * 100).toFixed(1) : "0.0";

      setSaveStatus("saving");
      try {
        const res = await fetch("/api/quiz-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizId: quiz.id,
            score: currentScore,
            total,
            percentage,
            userAnswers: answers,
            status,
            lastUpdated: new Date().toISOString(),
          }),
        });

        if (!res.ok) throw new Error("Save failed");
        setSaveStatus("saved");
        hasUnsavedChangesRef.current = false;
      } catch {
        // Only show error for manual saves or final submit
        if (status === "completed") setSaveStatus("error");
        else setSaveStatus("idle"); // Passive fail for auto-save
      }
    },
    [userId, quiz?.id, questions],
  );

  // 1. Save to LocalStorage on every change
  useEffect(() => {
    if (!userId || !quiz?.id || loading || showResults) return;

    // Don't save empty states if we haven't started
    const hasAnswers = userAnswers.some((a) => a !== null);
    if (!hasAnswers) return;

    const data: QuizActivityData = {
      score: 0, // Not relevant for in-progress local
      total: questions.length,
      percentage: "0",
      userAnswers,
      takenAt: new Date().toISOString(),
      status: "in-progress",
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(
      `nexera_quiz_${userId}_${quiz.id}`,
      JSON.stringify(data),
    );
    latestAnswersRef.current = userAnswers;
    hasUnsavedChangesRef.current = true;
  }, [userAnswers, userId, quiz?.id, loading, showResults, questions.length]);

  // 2. Periodic Auto-Save to DB (Every 5 minutes)
  useEffect(() => {
    if (!userId || showResults) return;

    const intervalId = setInterval(
      () => {
        if (hasUnsavedChangesRef.current) {
          console.log("Vari: Auto-saving quiz progress...");
          saveToApi(latestAnswersRef.current, "in-progress");
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(intervalId);
  }, [userId, saveToApi, showResults]);

  // ─── Handlers ───────────────────────────────────────────────────────────

  const handleSelectOption = (optionIndex: number) => {
    if (!showResults && userAnswers[currentQuestion] === null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setUserAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setShowResults(true);
    setReviewingPrevious(false);

    // Save as completed
    await saveToApi(userAnswers, "completed");

    // Build local storage cleanup
    if (userId && quiz?.id) {
      localStorage.removeItem(`nexera_quiz_${userId}_${quiz.id}`);
    }
  };

  const handleRetakeNew = () => {
    // Start a fresh attempt
    setCurrentQuestion(0);
    const blankAnswers = new Array(questions.length).fill(null);
    setUserAnswers(blankAnswers);
    latestAnswersRef.current = blankAnswers;
    setShowResults(false);
    setReviewingPrevious(false);
    setSaveStatus("idle");

    // Clear local storage for fresh start
    if (userId && quiz?.id) {
      localStorage.removeItem(`nexera_quiz_${userId}_${quiz.id}`);
    }
  };

  const handleReviewPrevious = () => {
    setReviewingPrevious(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    return userAnswers.reduce<number>((acc, answer, index) => {
      return answer === questions[index]?.correctIndex ? acc + 1 : acc;
    }, 0);
  };

  // ─── Render ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">
          <div className="spinner"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return <QuizNotFound error={error || "No questions available"} />;
  }

  const currentQ = questions[currentQuestion];
  const totalScore = calculateScore();
  const percentage = ((totalScore / questions.length) * 100).toFixed(1);
  const userAnswer = userAnswers[currentQuestion];
  const isCorrectAnswer = userAnswer === currentQ.correctIndex;
  const isAnswered = userAnswers[currentQuestion] !== null;
  const showAnswerFeedback = isAnswered;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const answeredCount = userAnswers.filter((a) => a !== null).length;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // ─── Results Screen ─────────────────────────────────────────────────────
  if (showResults) {
    // If reviewing previous from DB, show that score.
    // If just submitted (reviewingPrevious=false), show calculated score.
    const useSaved = reviewingPrevious && savedActivity;

    const displayScore = useSaved ? savedActivity.score : totalScore;
    const displayTotal = useSaved ? savedActivity.total : questions.length;
    const displayPct = useSaved ? savedActivity.percentage : percentage;
    const displayAnswers = useSaved ? savedActivity.userAnswers : userAnswers;

    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1 className="quiz-title">{quiz?.title || "Quiz"}</h1>
          {quiz?.description && (
            <p className="quiz-description">{quiz.description}</p>
          )}
        </div>

        {useSaved && (
          <div className="previous-attempt-banner">
            <span className="previous-attempt-icon">📖</span>
            <div className="previous-attempt-text">
              <strong>Viewing previous attempt</strong>
              <span>Taken on {formatDate(savedActivity.takenAt)}</span>
            </div>
            <button
              className="btn btn-primary btn-sm retake-btn"
              onClick={handleRetakeNew}
            >
              Retake Quiz
            </button>
          </div>
        )}

        {!reviewingPrevious && saveStatus !== "idle" && (
          <div className={`save-status save-status--${saveStatus}`}>
            {saveStatus === "saving" && (
              <>
                <span className="save-spinner"></span> Saving your results…
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <span>✓</span> Results saved successfully!
              </>
            )}
            {saveStatus === "error" && (
              <>
                <span>⚠</span> Could not save results. Progress may be lost.
              </>
            )}
          </div>
        )}

        <div className="quiz-results">
          <div className="results-card">
            <h2>{reviewingPrevious ? "Previous Result" : "Quiz Complete!"}</h2>
            <div className="score-display">
              <div className="score-circle">
                <div className="score-percentage">{displayPct}%</div>
                <div className="score-subtitle">Score</div>
              </div>
              <div className="score-details">
                <div className="score-line">
                  <span className="score-label">Correct Answers:</span>
                  <span className="score-value correct">
                    {displayScore}/{displayTotal}
                  </span>
                </div>
                <div className="score-line">
                  <span className="score-label">Wrong Answers:</span>
                  <span className="score-value wrong">
                    {displayTotal - displayScore}/{displayTotal}
                  </span>
                </div>
              </div>
            </div>
            <div className="results-breakdown">
              <h3>Review Answers</h3>
              <div className="review-list">
                {questions.map((q, idx) => {
                  const ans = displayAnswers[idx];
                  const isCorrect = ans === q.correctIndex;
                  return (
                    <div
                      key={idx}
                      className={`review-item ${
                        isCorrect ? "correct-item" : "incorrect-item"
                      }`}
                    >
                      <div className="review-header">
                        <span className="review-number">Q{idx + 1}</span>
                        <span
                          className={`review-status ${
                            isCorrect ? "correct" : "incorrect"
                          }`}
                        >
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </span>
                      </div>
                      <p className="review-question">{q.question}</p>
                      <div className="review-answers">
                        <div
                          className={`your-answer ${
                            !isCorrect ? "wrong-answer" : ""
                          }`}
                        >
                          <strong>Your Answer:</strong>
                          <p>
                            {ans !== null ? q.options[ans] : "Not answered"}
                          </p>
                        </div>
                        {!isCorrect && (
                          <div className="correct-answer">
                            <strong>Correct Answer:</strong>
                            <p>{q.options[q.correctIndex]}</p>
                          </div>
                        )}
                        {q.explanation && (
                          <div className="explanation">
                            <strong>Explanation:</strong>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleRetakeNew}>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── In-Progress Resume Prompt ──────────────────────────────────────────
  // If we loaded an incomplete state (some answers filled, but not all/submitted)
  // We might want to notify them, but currently we just auto-fill and let them continue.

  // ─── Previous Attempt Prompt ────────────────────────────────────────────
  // Shown if they have a COMPLETED saved activity but are seeing the questions screen (Retake mode or not started)
  // Logic: savedActivity exists AND status=completed AND we aren't reviewing it.
  const showCompletedPrompt =
    savedActivity?.status === "completed" && !reviewingPrevious;

  return (
    <div className="quiz-container">
      <div className="sub-section">
        <div className="quiz-header">
          <h1 className="quiz-title">{quiz?.title || "Quiz"}</h1>
          {quiz?.description && (
            <p className="quiz-description">{quiz.description}</p>
          )}
        </div>
        {showCompletedPrompt && (
          <div className="previous-attempt-card">
            <div className="previous-attempt-card__icon">📊</div>
            <div className="previous-attempt-card__content">
              <h3>You&apos;ve taken this quiz before</h3>
              <p>
                Last attempt: <strong>{savedActivity.percentage}%</strong> (
                {savedActivity.score}/{savedActivity.total} correct) &mdash;{" "}
                {formatDate(savedActivity.takenAt)}
              </p>
            </div>
            <div className="previous-attempt-card__actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleReviewPrevious}
              >
                Review
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="quiz-content">
        <div className="question-section">
          <div className="quiz-progress">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="progress-text">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="question-counter">
            <span className="counter-badge">{currentQuestion + 1}</span>
            <span className="counter-total">of {questions.length}</span>
          </div>

          <h2 className="question-text">{currentQ.question}</h2>

          <div className="options-list">
            {currentQ.options.map((option, index) => {
              const isSelected = userAnswers[currentQuestion] === index;
              const isCorrectOption = index === currentQ.correctIndex;
              const showFeedback = showAnswerFeedback && isAnswered;

              let optionClass = "option-btn";
              if (isSelected) {
                optionClass += " selected";
                if (showFeedback) {
                  optionClass += isCorrectAnswer ? " correct" : " incorrect";
                }
              }
              if (showFeedback && isCorrectOption && !isSelected) {
                optionClass += " correct-answer-highlight";
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleSelectOption(index)}
                  disabled={isAnswered}
                >
                  <div className="option-indicator">
                    {showFeedback && isSelected && (
                      <span className="feedback-icon">
                        {isCorrectAnswer ? "✓" : "✗"}
                      </span>
                    )}
                    {(!showFeedback || !isSelected) && (
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                    )}
                  </div>
                  <div className="option-content">
                    <p className="option-text">{option}</p>
                  </div>
                  {showFeedback && isCorrectOption && !isSelected && (
                    <div className="correct-indicator">
                      <span>✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Real-time Feedback Panel */}
          {showAnswerFeedback && isAnswered && (
            <div
              className={`answer-feedback ${
                isCorrectAnswer ? "feedback-correct" : "feedback-incorrect"
              }`}
            >
              <div className="feedback-header">
                <span className="feedback-icon-large">
                  {isCorrectAnswer ? "✓" : "✗"}
                </span>
                <span className="feedback-title">
                  {isCorrectAnswer ? "Correct!" : "Incorrect"}
                </span>
              </div>
              {currentQ.explanation && (
                <div className="feedback-explanation">
                  <strong>Explanation:</strong>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </div>
          )}

          <div className="quiz-controls">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>

            <div className="controls-center">
              {!isLastQuestion ? (
                <button className="btn btn-primary" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={answeredCount === 0}
                >
                  Submit Quiz
                </button>
              )}
            </div>

            <div className="controls-info">
              <span className={isAnswered ? "answered" : "not-answered"}>
                {isAnswered ? "✓ Answered" : "Not answered"}
              </span>
            </div>
          </div>
        </div>

        <div className="quiz-sidebar" style={showCompletedPrompt ? {marginTop: "-200px"} : {marginTop: "-120px"}}>
          <div className="sidebar-card">
            <h3>Progress</h3>
            <div className="progress-info">
              <div className="progress-stat">
                <span className="stat-label">Answered</span>
                <span className="stat-value">
                  {answeredCount}/{questions.length}
                </span>
              </div>
              <div className="progress-stat">
                <span className="stat-label">Remaining</span>
                <span className="stat-value">
                  {questions.length - answeredCount}/{questions.length}
                </span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Questions</h3>
            <div className="questions-grid">
              {questions.map((q, idx) => {
                const answered = userAnswers[idx] !== null;
                const correct = userAnswers[idx] === q.correctIndex;

                return (
                  <button
                    key={idx}
                    className={`question-nav ${
                      currentQuestion === idx ? "active" : ""
                    } ${answered ? (correct ? "correct" : "incorrect") : ""}`}
                    onClick={() => setCurrentQuestion(idx)}
                    title={
                      answered
                        ? correct
                          ? "Correct"
                          : "Incorrect"
                        : "Not answered"
                    }
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sidebar-card score-card">
            <h3>Current Score</h3>
            <div className="live-score">
              <div className="live-score-circle">
                <span className="live-score-value">{totalScore}</span>
                <span className="live-score-total">/ {questions.length}</span>
              </div>
              <div className="live-score-percentage">
                {answeredCount > 0 ? percentage : "0.0"}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
