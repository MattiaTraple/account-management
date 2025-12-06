import { useState, useEffect } from 'react';

interface UseUrlParamsResult {
  token?: string;
  code?: string;
  error?: string;
}

export const useUrlParams = (): UseUrlParamsResult => {
  const [params, setParams] = useState<UseUrlParamsResult>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const code = urlParams.get('code');

    if (!token && !code) {
      setParams({ error: 'Nessun token o codice trovato nell\'URL' });
    } else {
      setParams({ 
        token: token || undefined, 
        code: code || undefined 
      });
    }
  }, []);

  return params;
};
