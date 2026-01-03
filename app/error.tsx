// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Something went wrong!</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          background: '#7b7dee',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}