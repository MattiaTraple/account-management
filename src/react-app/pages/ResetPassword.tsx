import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface ResetPasswordState {
  verifying: boolean;
  submitting: boolean;
  success: boolean;
  formError: string;
  blockingError: string;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<ResetPasswordState>({
    verifying: true,
    submitting: false,
    success: false,
    formError: "",
    blockingError: "",
  });
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const passwordRules = [
    {
      label: "La password deve contenere almeno 8 caratteri",
      test: (value: string) => value.length >= 8,
    },
    {
      label: "La password deve contenere almeno una lettera maiuscola",
      test: (value: string) => /[A-Z]/.test(value),
    },
    {
      label: "La password deve contenere almeno una lettera minuscola",
      test: (value: string) => /[a-z]/.test(value),
    },
    {
      label: "La password deve contenere almeno un numero",
      test: (value: string) => /[0-9]/.test(value),
    },
    {
      label: "La password deve contenere almeno un carattere speciale",
      test: (value: string) => /[^A-Za-z0-9]/.test(value),
    },
  ];

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.newPassword === formData.confirmPassword;

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      setState((prev) => ({
        ...prev,
        verifying: false,
        blockingError: "Email o token mancanti nel link di reset.",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      verifying: false,
      blockingError: "",
    }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      setState((prev) => ({
        ...prev,
        formError: "Link non valido: email o token mancanti.",
      }));
      return;
    }

    for (const rule of passwordRules) {
      if (!rule.test(formData.newPassword)) {
        setState((prev) => ({
          ...prev,
          formError: rule.label,
        }));
        return;
      }
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setState((prev) => ({
        ...prev,
        formError: "Le password non corrispondono",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      submitting: true,
      formError: "",
    }));

    try {
      const response = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          (data as { message?: string }).message ??
            "Errore durante il reset della password",
        );
      }

      setState((prev) => ({
        ...prev,
        submitting: false,
        success: true,
      }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Errore durante il reset della password";
      setState((prev) => ({
        ...prev,
        submitting: false,
        formError: message,
      }));
    }
  };

  if (state.verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifica codice in corso...</p>
        </div>
      </div>
    );
  }

  if (state.blockingError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Non Valido</h2>
            <p className="text-gray-600 mb-6">{state.blockingError}</p>
            <button
              onClick={() => navigate("/login")}
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
              onClick={() => navigate("/login")}
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
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600 mt-2">Inserisci la tua nuova password</p>
        </div>

        {state.formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{state.formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nuova Password
            </label>
            <br />
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Conferma Password
            </label>
            <br />
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-700">Requisiti della password</p>
            <ul className="space-y-1">
              {passwordRules.map((rule) => {
                const satisfied = rule.test(formData.newPassword);
                return (
                  <li key={rule.label} className="flex items-center text-sm">
                    <span
                      className={`mr-2 h-2 w-2 rounded-full ${satisfied ? "bg-green-500" : "bg-gray-300"}`}
                    ></span>
                    <span className={satisfied ? "text-gray-700" : "text-gray-500"}>{rule.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className={`text-sm ${passwordsMatch ? "text-green-600" : "text-gray-600"}`}>
              {passwordsMatch ? "Le password coincidono" : "Le password non corrispondono"}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Aggiornamento..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
