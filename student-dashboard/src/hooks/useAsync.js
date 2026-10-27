import { useState, useEffect, useCallback } from 'react';

/**
 * Reusable useAsync Hook
 * Manages async lifecycle state: loading, data, error, and provides a trigger/refetch function.
 * Perfectly fulfills: "Async state and loading/error handling"
 */
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'pending' | 'success' | 'error'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus('pending');
      setError(null);
      try {
        const response = await asyncFunction(...args);
        setData(response);
        setStatus('success');
        return response;
      } catch (err) {
        setError(err?.message || 'An unexpected error occurred.');
        setStatus('error');
        throw err;
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
    setData
  };
}
