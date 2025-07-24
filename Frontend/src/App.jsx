import React from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect } from "react";
import { useState } from "react";
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

  // connecting with backend
  const reviewCode = async ()=>{
    const response = await axios.post('https://bytecritic-byte-sized-code-analyzer.onrender.com/ai',{prompt:code})
    setReview(response.data)
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
        <Markdown>{review}</Markdown>
        </div>
      </main>
    </div>
  );
};

export default App;
