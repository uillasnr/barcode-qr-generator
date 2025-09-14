import { useState } from "react";
import { QrCode, Barcode, RotateCw, Printer, Copy } from "lucide-react";
import BarcodeGenerator from "./components/BarcodeGenerator";
import QRCodeGenerator from "./components/QRCodeGenerator";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("qr"); 
  const [loading, setLoading] = useState(false); 
  const [generatedValue, setGeneratedValue] = useState<string | null>(null); 
  const [showCopied, setShowCopied] = useState(false); 

  // Atualiza o valor do input e limpa o valor gerado quando o input muda
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setGeneratedValue(null);
  };

  // Gera o código QR ou de barras após verificar se o input não está vazio
  const handleGenerate = async () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    setGeneratedValue(inputValue);
    setLoading(false);
  };

  // Copia o conteúdo do input para a área de transferência
  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Imprime o conteúdo gerado
  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(`
       <html>
        <head>
          <title>Print</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh;
            }
            #print-code {
              max-width: 100%; 
              text-align: center;
            }
            #print-code svg {
              width: 100%; 
              height: auto; 
            }
          </style>
        </head>
        <body>
          <div id="print-code">${printContent.innerHTML}</div>
        </body>
      </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
      printWindow?.close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1 text-center">
            Gerador de Códigos
          </h1>
          <p className="text-gray-600">Gere QR Codes e códigos de barras</p>
        </div>
     
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("qr")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
              activeTab === "qr"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <QrCode size={20} />
            <span>QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab("barcode")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
              activeTab === "barcode"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Barcode size={20} />
            <span>Código de Barras</span>
          </button>
        </div>

        {/* Seção de entrada */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Digite um texto ou número"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />

            {/* Botões de copiar e gerar */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
              <button
                onClick={handleCopy}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-md  hover:bg-gray-400 `}
              >
                <Copy size={18} />
              </button>

              <button
                onClick={handleGenerate}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-md transition-all ${
                  inputValue.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <RotateCw size={20} />
              </button>
            </div>
          </div>

          {showCopied && <p className="text-blue-500 mt-2">Texto copiado!</p>}
        </div>

        {/* Exibição do código gerado */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px] max-h-[200px]">
            <div className="loader" />
          </div>
        ) : generatedValue ? (
          <div
            id="print-content"
            className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col justify-center items-center min-h-[200px] max-h-[200px]"
          >
            {/* Exibe QR Code ou código de barras */}
            {activeTab === "qr" ? (
              <QRCodeGenerator value={generatedValue} />
            ) : (
              <BarcodeGenerator value={generatedValue} />
            )}
          </div>
        ) : null}

        {/* Botão de impressão */}
        {generatedValue && (
          <button
            onClick={handlePrint}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            <Printer size={20} />
            <span>Imprimir</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
