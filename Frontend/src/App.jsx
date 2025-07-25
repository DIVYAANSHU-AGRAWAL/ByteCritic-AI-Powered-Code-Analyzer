import React from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Editor from "react-simple-code-editor";
import axios from 'axios';
import Markdown from 'react-markdown'

const App = () => {
  useEffect(() => {
    prism.highlightAll();
  });      

  // State for taking code as input on left side
  const [code, setCode] = useState(``);

  // State variable to display response on frontend on right side
  const [review, setReview] = useState(``)

  // State variable for message to display while waiting for API response
  const [loading, setLoading] = useState(false);

  const reviewRef = useRef();

  const copyToClipboard = () => {
    if(reviewRef.current){
      navigator.clipboard.writeText(reviewRef.current.innerText);
      alert("Copied the response to clipboard!");
    }
  }
    

  // connecting with backend
  const reviewCode = async ()=>{
    setLoading(true);
    const response = await axios.post('https://bytecritic-byte-sized-code-analyzer.onrender.com/ai/get-review',{prompt:code})
    setReview(response.data)
    setLoading(false);
  }

  return (
    <div>
      <div className="MainTitle">ByteCritic: Your Byte Sized Code Analyzer</div>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontSize: 22.5,
                border: "1px solid black",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          
          <button onClick={reviewCode}>Review</button>
        </div>
        <div className="right">
          <div ref = {reviewRef}>
        {loading ? <p>Analyzing code...</p> : <Markdown>{review}</Markdown>}
            </div>
          <button onClick ={copyToClipboard}>Copy Review</button>
        </div>
      </main>
    </div>
  );
};

export default App;
