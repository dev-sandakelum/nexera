"use client";

import { useState, useEffect } from "react";
import { nexNoteAbout, nexNoteData, quizNote } from "@/components/types";
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

export default function QuizViewerClient({
  notesAbout,
  notesData,
  pathname,
}: {
  notesAbout: nexNoteAbout[];
  notesData: nexNoteData[];
  pathname: string;
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
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

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

        // Get first quiz set from the data
        const firstQuizKey = Object.keys(data)[0];
        if (!firstQuizKey || !Array.isArray(data[firstQuizKey])) {
          setError("Invalid quiz data format");
          setLoading(false);
          return;
        }

        const quizQuestions = data[firstQuizKey];
        setQuestions(quizQuestions);
        setUserAnswers(new Array(quizQuestions.length).fill(null));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz");
        setLoading(false);
      }
    };

    loadQuizData();
  }, [quizUrl]);

  // Reset feedback when changing questions
  useEffect(() => {
    setShowAnswerFeedback(false);
  }, [currentQuestion]);

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
    return <QuizNotFound />;
  }

  const handleSelectOption = (optionIndex: number) => {
    if (!showResults) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setUserAnswers(newAnswers);
      setShowAnswerFeedback(true);
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

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setShowAnswerFeedback(false);
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const currentQ = questions[currentQuestion];
  const totalScore = calculateScore();
  const percentage = ((totalScore / questions.length) * 100).toFixed(1);
  const userAnswer = userAnswers[currentQuestion];
  const isCorrectAnswer = userAnswer === currentQ.correctIndex;

  if (showResults) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1 className="quiz-title">{quiz?.title || "Quiz"}</h1>
          {quiz?.description && (
            <p className="quiz-description">{quiz.description}</p>
          )}
        </div>

        <div className="quiz-results">
          <div className="results-card">
            <h2>Quiz Complete!</h2>

            <div className="score-display">
              <div className="score-circle">
                <div className="score-percentage">{percentage}%</div>
                <div className="score-subtitle">Score</div>
              </div>
              <div className="score-details">
                <div className="score-line">
                  <span className="score-label">Correct Answers:</span>
                  <span className="score-value correct">
                    {totalScore}/{questions.length}
                  </span>
                </div>
                <div className="score-line">
                  <span className="score-label">Wrong Answers:</span>
                  <span className="score-value wrong">
                    {questions.length - totalScore}/{questions.length}
                  </span>
                </div>
                <div className="score-line">
                  <span className="score-label">Accuracy:</span>
                  <span className="score-value">{percentage}%</span>
                </div>
              </div>
            </div>

            <div className="results-breakdown">
              <h3>Review Answers</h3>
              <div className="review-list">
                {questions.map((q, idx) => {
                  const isCorrect = userAnswers[idx] === q.correctIndex;
                  const userAns = userAnswers[idx];
                  return (
                    <div
                      key={idx}
                      className={`review-item ${isCorrect ? "correct-item" : "incorrect-item"}`}
                    >
                      <div className="review-header">
                        <span className="review-number">Q{idx + 1}</span>
                        <span
                          className={`review-status ${isCorrect ? "correct" : "incorrect"}`}
                        >
                          {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </span>
                      </div>
                      <p className="review-question">{q.question}</p>
                      <div className="review-answers">
                        <div
                          className={`your-answer ${!isCorrect ? "wrong-answer" : ""}`}
                        >
                          <strong>Your Answer:</strong>
                          <p>
                            {userAns !== null
                              ? q.options[userAns]
                              : "Not answered"}
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

            <button className="btn btn-primary" onClick={handleReset}>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAnswered = userAnswers[currentQuestion] !== null;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const answeredCount = userAnswers.filter((a) => a !== null).length;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz?.title || "Quiz"}</h1>
        {quiz?.description && (
          <p className="quiz-description">{quiz.description}</p>
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
                  disabled={showResults}
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
              className={`answer-feedback ${isCorrectAnswer ? "feedback-correct" : "feedback-incorrect"}`}
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
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!isAnswered}
                >
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

        <div className="quiz-sidebar">
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

          {/* Live Score Card */}
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
