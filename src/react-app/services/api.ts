export const API_ENDPOINTS = {
  // Endpoint per conferma email
  CONFIRM_EMAIL: '/api/auth/confirm-email',
  
  // Endpoint per validare codice reset password
  VALIDATE_RESET_CODE: '/api/auth/validate-reset-code',
  
  // Endpoint per resettare password
  RESET_PASSWORD: '/api/auth/reset-password'
} as const;

// Funzioni helper per le chiamate API
export const apiService = {
  async confirmEmail(token: string) {
    const response = await fetch(`${API_ENDPOINTS.CONFIRM_EMAIL}?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Errore durante la conferma dell\'email');
    }
    
    return response.json();
  },

  async validateResetCode(code: string) {
    const response = await fetch(`${API_ENDPOINTS.VALIDATE_RESET_CODE}?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Codice non valido o scaduto');
    }
    
    return response.json();
  },

  async resetPassword(code: string, newPassword: string) {
    const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        newPassword,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Errore durante il reset della password');
    }
    
    return response.json();
  },
};
