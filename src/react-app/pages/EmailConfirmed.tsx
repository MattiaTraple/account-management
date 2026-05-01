import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

type ConfirmStatus = 'loading' | 'verified' | 'already-verified';

export default function EmailConfirmed() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ConfirmStatus>('loading');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get('status');
    const token = params.get('token');

    if (statusParam === 'verified') {
      setStatus('verified');
      return;
    }

    if (statusParam === 'already-verified') {
      setStatus('already-verified');
      return;
    }

    if (token) {
      apiService.confirmEmail(token)
        .then(() => navigate('/confirm-email?status=verified', { replace: true }))
        .catch(() => navigate('/email-verification-error', { replace: true }));
      return;
    }

    navigate('/email-verification-error', { replace: true });
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifica email in corso...</p>
        </div>
      </div>
    );
  }

  if (status === 'already-verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account già verificato</h2>
            <p className="text-gray-600 mb-6">
              Il tuo account è stato già confermato in precedenza. Puoi accedere direttamente.
            </p>
            <a
              href="/login"
              className="inline-block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 text-center"
            >
              Vai al Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Confermato!</h2>
          <p className="text-gray-600 mb-6">Il tuo account è stato confermato con successo. Ora puoi accedere.</p>
        </div>
      </div>
    </div>
  );
}
