// app/error.tsx
'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
    const pathName = usePathname();
    const params = new URLSearchParams();
    params.append('from', pathName || '/');
    const param_r = params.get("r");
    const param_u = params.get("u");
    const param_n = params.get("n");

    if(param_r == "notes" && param_u && param_n){
        redirect(pathName);
    }

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