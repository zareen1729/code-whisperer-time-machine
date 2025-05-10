import React, { useState } from "react";
import mermaid from "mermaid";

const App = () => {
  const [legacyCode, setLegacyCode] = useState(
    "function calculateTax(income) {\n  if (income < 10000) return 0;\n  return income * 0.2;\n}"
  );
  const [explanation, setExplanation] = useState("");
  const [translated, setTranslated] = useState("");
  const [diagram, setDiagram] = useState(
    "graph TD; Code-->Understand; Understand-->Translate; Translate-->Modernize;"
  );
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.amazonq.fake/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({ code: legacyCode })
      });

      const data = await response.json();

      setExplanation(data.explanation || "No explanation received.");
      setTranslated(data.translatedCode || "No translation received.");
      setTimeout(() => mermaid.init(undefined, ".mermaid"), 0);
    } catch (err) {
      console.error("Error calling Amazon Q API:", err);
      setExplanation("⚠️ Failed to call Amazon Q Developer API.");
      setTranslated("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 font-mono">
      <h1 className="text-2xl mb-4">🕰️ Code Whisperer Time Machine</h1>
      <textarea
        rows={8}
        className="w-full p-2 border"
        value={legacyCode}
        onChange={(e) => setLegacyCode(e.target.value)}
      />
      <button className="mt-2 p-2 bg-blue-600 text-white rounded" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze & Translate"}
      </button>

      {explanation && (
        <div className="mt-4">
          <h2 className="font-bold">Explanation:</h2>
          <p>{explanation}</p>
        </div>
      )}

      {translated && (
        <div className="mt-4">
          <h2 className="font-bold">Translated Python Code:</h2>
          <pre className="bg-gray-100 p-2">{translated}</pre>
        </div>
      )}

      <div className="mt-4">
        <h2 className="font-bold">Architecture Diagram:</h2>
        <div className="mermaid">{diagram}</div>
      </div>
    </div>
  );
};

export default App;

