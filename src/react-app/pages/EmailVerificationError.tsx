export default function EmailVerificationError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-8 w-8 rounded-full bg-red-100 mb-4">
            <svg width="16" height="16" className="text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore Verifica Email</h2>
          <p className="text-gray-600 mb-6">
            Si è verificato un problema durante la verifica della tua email. Il link potrebbe essere scaduto o non valido.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Suggerimento:</strong> È possibile che il link di verifica sia scaduto. 
              Ti consigliamo di richiedere una nuova email di conferma per il tuo account.
            </p>
          </div>
          
          <div className="space-y-3">
            
            <button
              onClick={() => window.location.href = "mailto:tasked.feedback@gmail.com?subject=Problema verifica email&body=Ho riscontrato un problema durante la verifica della mia email."}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Contatta Supporto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
