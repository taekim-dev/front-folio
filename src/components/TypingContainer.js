import React, { useState, useEffect } from 'react';

const TypingContainer = ({ onSkip }) => {
    const [currentText, setCurrentText] = useState([]);
    const [staticText, setStaticText] = useState([]);
    const [skip, setSkip] = useState(false);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [segmentIndex, setSegmentIndex] = useState(0);

  const textArray = [     [{ text: "Welcome! My name is ", class: "white" }, { text: "Taewan Kim", class: "cyan" }],
  [{ text: "I am a ", class: "white" }, { text: "full-stack software engineer", class: "yellow" }],
  [{ text: "Learn more about my ", class: "white" }, { text: "projects and experiences", class: "green" }, { text: " here!", class: "white" }],
  [{ text: "Compiling the next lines...", class: "white" }],
  [{ text: "", class: "white" }] ];
  const staticTextArray = [ [
    [{ text: "----------------------------", class: "white" }],
    [{ text: "#Github: ", class: "yellow" }, { text: "/taekim-dev", class: "green", url: "https://github.com/taekim-dev" }],
    [{ text: "", class: "white" }],
    [{ text: "#Resume: ", class: "yellow" }, { text: "View Resume", class: "green", url: "https://drive.google.com/file/d/1DR6fyEdD_wc3xGl7owRNXgPqVu-_B_c1/view?usp=share_link" }],
    [{ text: "", class: "white" }],
    [{ text: "#LinkedIn: ", class: "yellow" }, { text: "/in/taekimdev", class: "green", url: "https://www.linkedin.com/in/taekimdev" }],
    [{ text: "----------------------------", class: "white" }],
    [{ text: "#Projects", class: "yellow" }],
    [{ text: "  * ", class: "white" }, { text: "Click-and-Collect", class: "green", url: "https://click-and-collect2.netlify.app" }, { text: ": E-commerce app built with ", class: "white" }, { text: "React.js", class: "blue" }, { text: " and ", class: "white" }, { text: "Django", class: "red" }, { text: ".", class: "white" }],
    [{ text: "  * ", class: "white" }, { text: "Task-Flow", class: "green", url: "https://task-flow2.netlify.app" }, { text: ": Task management app built with ", class: "white" }, { text: "React.js", class: "blue" }, { text: " and ", class: "white" }, { text: "Typescript", class: "purple" }, { text: ".", class: "white" }],
    [{ text: "", class: "white" }],
    [{ text: "More: I was also the co-founder of ", class: "white" }, { text: "Tap Comics", class: "cyan", url: "https://tapcomics.com" }, { text: ".", class: "white" }]
] ];

useEffect(() => {
    const typeNextSegment = () => {
      if (sentenceIndex < textArray.length && !skip) {
        let sentence = textArray[sentenceIndex];
        let newSentence = [...(currentText[sentenceIndex] || [])];
        newSentence.push(sentence[segmentIndex]);
        setCurrentText((current) => {
          let newText = [...current];
          newText[sentenceIndex] = newSentence;
          return newText;
        });
        setSegmentIndex(segmentIndex + 1);

        if (segmentIndex >= sentence.length - 1) {
          setSentenceIndex(sentenceIndex + 1);
          setSegmentIndex(0);
        }
      } else {
        setStaticText(staticTextArray.flat());
      }
    };

    const skipTyping = () => {
      setSkip(true);
      setCurrentText(textArray.flat());
      setStaticText(staticTextArray.flat());
      onSkip && onSkip();
    };

    if (!skip) {
        const typingTimeout = setTimeout(typeNextSegment, 500); // increase delay here to 500ms
        return () => clearTimeout(typingTimeout);
      } else {
        skipTyping();
      }
    }, [sentenceIndex, segmentIndex, skip, onSkip]);

  return (
    <div id="typing-container" className="typing-container">
      {currentText.map((sentence, index) => (
        <p key={index}>
          {sentence.map((segment, i) => (
            <span key={i} className={segment.class}>
              {segment.url ? <a href={segment.url} target="_blank" rel="noopener noreferrer">{segment.text}</a> : segment.text}
            </span>
          ))}
        </p>
      ))}
      <br />
      {/* your staticText mapping here */}
    </div>
  );
};

export default TypingContainer;