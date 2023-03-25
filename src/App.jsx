import { Configuration, OpenAIApi } from "openai";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="App d-flex flex-column justify-content-center align-items-center">
      {loading ? (
        <><h1>Loading...Generating the image</h1></>
      ) : (
        <>
          <h1>AI Image Generator</h1>

          <textarea
            className="p-2 m-4"
            placeholder="Enter any prompt to get an AI generated Image"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="4"
            cols="40"
          />
          <Button variant="primary" onClick={generateImage} className="my-3">
            Generate Image
          </Button>

          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
