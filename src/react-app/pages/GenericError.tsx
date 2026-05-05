export default function GenericError({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Qualcosa è andato storto</h2>
          <p className="text-gray-600 mb-6">
            {message ?? "Si è verificato un errore imprevisto. Riprova tra qualche istante."}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              Se il problema persiste, contatta il supporto all'indirizzo{" "}
              <a href="mailto:tasked.feedback@gmail.com" className="font-semibold underline">
                tasked.feedback@gmail.com
              </a>
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Riprova
          </button>
        </div>
      </div>
    </div>
  );
}
