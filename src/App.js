
import logo from "./assets/logo.png";
import { useState } from "react";


function App() {
  const [questions, setQuestions] = useState([]);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  
  

      const handleUpload = async () => {
      if (!file) {
        alert("Please select a file");
        return;
      }

      setLoading(true); // start loading

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8080/api/pdf/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setQuestions(data);

        alert("Upload Successful ✅");

      } catch (error) {
        alert("Upload Failed ❌");
      }

      setLoading(false); // stop loading
    };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

                  {/* Header */}
            <div className="text-center py-12 border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">

        <div className="bg-white inline-block p-6 rounded-2xl shadow-xl">
          <img 
            src={logo} 
            alt="The Mahaveer's Group Logo"
            className="w-44 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-sky-400 tracking-wide mt-6">
          The Mahaveer's Group
        </h1>

        <p className="text-gray-400 mt-3 text-lg md:text-xl">
          Empowering Developers. Simplifying Lives.
        </p>

      </div>
      {/* Upload Section */}
      <div className="max-w-xl mx-auto mt-10 bg-slate-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-sky-300 mb-6">
          Smart PDF Question Extractor
        </h2>

        <input
          type="file"
          className="w-full mb-4 p-2 bg-slate-700 rounded-lg"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 px-6 py-2 rounded-xl disabled:bg-gray-500"
          >
            {loading ? "Processing..." : "Upload PDF"}
          </button>

                      {loading && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-sky-400"></div>
              </div>
            )}

      </div>

            {/* Questions Section */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-slate-800 border border-slate-700 
                      p-6 rounded-2xl mb-8 shadow-lg 
                      hover:shadow-sky-500/10 transition duration-300"
          >
            
            {/* Question Header */}
            <div className="flex items-center mb-4">
              <span className="bg-sky-500 text-white 
                              px-3 py-1 rounded-full 
                              text-sm font-semibold mr-3">
                Q.{q.questionNumber}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-lg mb-5 leading-relaxed">
              {q.questionText}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options?.map((opt, i) => (
                <div
                  key={i}
                  className="bg-slate-700 hover:bg-slate-600 
                            p-3 rounded-xl transition duration-200"
                >
                  <span className="font-semibold text-sky-300 mr-2">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="text-center py-6 mt-12 border-t border-slate-700 text-gray-500 text-sm">
        © 2026 The Mahaveer's Group | Built with ❤️ by Developers
      </div>
    </div>
  );
}

export default App;