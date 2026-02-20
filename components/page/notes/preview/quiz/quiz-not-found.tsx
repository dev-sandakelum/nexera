import Link from "next/link";

export default function QuizNotFound({error}: {error?: string }) {
  return (
    <div className="quiz-not-found">
      <div className="not-found-content">
        <div className="not-found-icon">
          <span>❌</span>
        </div>
        <h1>Quiz Not Found</h1>
        <p>The quiz you're looking for doesn't exist or couldn't be loaded.</p>
        {error && <p className="error-message">{error}</p>}
        <div className="not-found-actions">
          <Link href="/Notes" className="btn btn-primary">
            Back to Notes
          </Link>
        </div>
      </div>
    </div>
  );
}
