export default function Policies() {
  const handleDownload = () => {
    // Il file verrà scaricato dalla cartella public
    const fileName = 'policy-utilizzo.pdf';
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy di Utilizzo</h1>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-between hover:border-blue-500 transition-colors">
          <div className="flex-1 mr-4">
            <p className="text-gray-600 text-sm">
              Documento unico in formato PDF che include Termini e Condizioni, Privacy Policy e Cookie Policy.
            </p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Scarica PDF
        </button>
      </div>
    </div>
  );
}
