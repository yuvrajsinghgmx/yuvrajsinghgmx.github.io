const lines = ["Hello, I'm Yuvraj Singh", "Welcome to my Portfolio"];
const typingText = document.getElementById("typing-text");
let currentLine = 0;
let index = 0;

function typeEffect() {
  if (currentLine < lines.length) {
    if (index < lines[currentLine].length) {
      typingText.textContent += lines[currentLine].charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    } else {
      index = 0;
      currentLine++;
      if (currentLine < lines.length) {
        setTimeout(() => {
          typingText.textContent = "";
          typeEffect();
        }, 1000);
      }
    }
  }
}

// typeEffect();
