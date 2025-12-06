import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface ResetPasswordState {
  loading: boolean;
  error: string;
  success: boolean;
  codeValid: boolean;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<ResetPasswordState>({
    loading: true,
    error: '',
    success: false,
    codeValid: false
  });
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (!code) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Codice di reset mancante'
      }));
      return;
    }

    // Qui chiamerai l'endpoint per validare il codice
    // Per ora simuliamo una validazione riuscita
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        loading: false,
        codeValid: true
      }));
    }, 1000);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setState(prev => ({ ...prev, error: 'Le password non coincidono' }));
      return;
    }

    if (formData.newPassword.length < 8) {
      setState(prev => ({ ...prev, error: 'La password deve essere di almeno 8 caratteri' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: '' }));
    
    try {
      // Qui chiamerai l'endpoint per resettare la password
      // Per ora simuliamo un reset riuscito
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          loading: false,
          success: true
        }));
      }, 1500);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Errore durante il reset della password'
      }));
    }
  };

  if (state.loading && !state.codeValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifica codice in corso...</p>
        </div>
      </div>
    );
  }

  if (state.error && !state.codeValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Codice Non Valido</h2>
            <p className="text-gray-600 mb-6">{state.error}</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Torna al Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
            <p className="text-gray-600 mb-6">La tua password è stata aggiornata con successo.</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Vai al Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600 mt-2">Inserisci la tua nuova password</p>
        </div>
        
        {state.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{state.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nuova Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Conferma Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.loading ? 'Aggiornamento...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
