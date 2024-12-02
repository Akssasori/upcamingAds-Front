import React, { useState, useEffect } from "react";
import api from "../../services/Api";
import './TextToSpeechForm.css';

const TextToSpeechForm = () => {
  const [voiceId, setVoiceId] = useState("");
  const [stability, setStability] = useState("");
  const [similarityBoost, setSimilarityBoost] = useState("");
  const [style, setStyle] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post(
        "/audio/convert-text-to-speech-stream",
        text,
        {
          params: {
            voiceId,
            stability: stability || undefined,
            similarityBoost: similarityBoost || undefined,
            style: style || undefined,
          },
        }
      );
      setResponse(result.data);
    } catch (error) {
      console.error("Error", error);
      setResponse("Error ocorrido");
    }
  };

  return (
    <div className="text-to-speech-container">
            <div className="settings-container">
                <h2>Settings</h2>
                <div className="settings">
                    <label>
                        <span>Voice:</span>
                        <select value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
                            <option value="LIGIA">LIGIA</option>
                            {/* Adicione mais opções se necessário */}
                        </select>
                    </label>
                    <label>
                        <span>Stability:</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={stability}
                            onChange={(e) => setStability(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        <span>Similarity:</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={similarityBoost}
                            onChange={(e) => setSimilarityBoost(Number(e.target.value))}
                        />
                    </label>
                </div>
            </div>
            <div className="text-input-container">
                <h2>Text to Speech</h2>
                <textarea
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleSubmit}>Generate Speech</button>
                {response && (
                    <div className="response-container">
                        <h3>Response</h3>
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </div>
  );
};

export default TextToSpeechForm;
