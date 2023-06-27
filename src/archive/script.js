let i = 0;
let j = 0;
let skip = false;

const textArray = [
    [{ text: "Welcome! My name is ", class: "white" }, { text: "Taewan Kim", class: "cyan" }],
    [{ text: "I am a ", class: "white" }, { text: "full-stack software engineer", class: "yellow" }],
    [{ text: "Learn more about my ", class: "white" }, { text: "projects and experiences", class: "green" }, { text: " here!", class: "white" }],
    [{ text: "Compiling the next lines...", class: "white" }],
    [{ text: "", class: "white" }]
  ];
  
  const staticTextArray = [
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
];


  function typeSegment(segment, charIndex, next) {
    if (charIndex < segment.text.length) {
      let span = document.getElementById('typing-container').lastElementChild;
  
      if (segment.url && charIndex === 0) {
        let a = document.createElement('a');
        a.href = segment.url;
        a.textContent = segment.text;
        a.className = segment.class;
        a.target = "_blank"; 
        a.rel = "noopener noreferrer"; // This line was added for security reasons
        span.appendChild(a);
        setTimeout(next, segment.text.length * (Math.random()*(80-50)+50));
      } else if (!segment.url) {
        span.textContent += segment.text.charAt(charIndex);
        setTimeout(function() { typeSegment(segment, ++charIndex, next); }, Math.random()*(80-50)+50);
      }
    } else if (next) {
      next();
    }
  }  
  
  
  function typeSentence(sentence, segmentIndex, next, timeBetweenSentences) {
    if (segmentIndex < sentence.length) {
        let segment = sentence[segmentIndex];
        let span = document.getElementById('typing-container').lastElementChild;
        if (!span || span.className !== segment.class) {
            span = document.createElement('span');
            span.className = segment.class;
            document.getElementById('typing-container').appendChild(span);
        }
        typeSegment(segment, 0, function() { typeSentence(sentence, ++segmentIndex, next, timeBetweenSentences); });
    } else if (next) {
        if(sentence[0].text === "") {
            document.getElementById('typing-container').appendChild(document.createElement('br'));
        } else {
            document.getElementById('typing-container').innerHTML += '<br>';
        }
        setTimeout(next, timeBetweenSentences);
    }
}


function typeNextSentence() {
  if(i < textArray.length && !skip) {
    typeSentence(textArray[i++], 0, typeNextSentence, 500);
  } else {
    typeStaticText(0);
  }
}

function typeStaticText(k) {
  if(k < staticTextArray.length && !skip) {
    typeSentence(staticTextArray[k], 0, function() { typeStaticText(k+1); }, 1000);
  }
}

document.getElementById('skip-button').addEventListener('click', function() {

  skip = true;
  // clear the container
  document.getElementById('typing-container').innerHTML = "";

  //Hide the skip button
  this.style.display = "none";

  // display the entire textArray instantly
  for (let i = 0; i < textArray.length; i++) {
    for(let j = 0; j < textArray[i].length; j++) {
      let span = document.createElement('span');
      span.className = textArray[i][j].class;

      // If there is a url, create a hyperlink
      if(textArray[i][j].url) {
        let a = document.createElement('a');
        a.href = textArray[i][j].url;
        a.textContent = textArray[i][j].text;
        a.className = textArray[i][j].class;
        a.target = "_blank"; 
        a.rel = "noopener noreferrer";
        span.appendChild(a);
      } else {
        span.textContent = textArray[i][j].text;
      }
      document.getElementById('typing-container').appendChild(span);
    }
    document.getElementById('typing-container').appendChild(document.createElement('br'));
  }

  // display the entire staticTextArray instantly
  for (let i = 0; i < staticTextArray.length; i++) {
    for(let j = 0; j < staticTextArray[i].length; j++) {
      let span = document.createElement('span');
      span.className = staticTextArray[i][j].class;

      // If there is a url, create a hyperlink
      if(staticTextArray[i][j].url) {
        let a = document.createElement('a');
        a.href = staticTextArray[i][j].url;
        a.textContent = staticTextArray[i][j].text;
        a.className = staticTextArray[i][j].class;
        a.target = "_blank"; 
        a.rel = "noopener noreferrer";
        span.appendChild(a);
      } else {
        span.textContent = staticTextArray[i][j].text;
      }
      document.getElementById('typing-container').appendChild(span);
    }
    document.getElementById('typing-container').appendChild(document.createElement('br'));
  }
});

typeNextSentence();