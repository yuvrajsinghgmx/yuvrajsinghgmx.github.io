const lines = [
    "Hello, I'm Yuvraj Singh",
    "Welcome to my Portfolio"
];
const typingText = document.getElementById('typing-text');
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
            }else {
                document.querySelector('.splash-screen').classList.add('hidden');
                fetch("index.html")
  .then((response) => response.text())
  .then((data) => {
    document.body.innerHTML = data;
    let script = document.createElement('script');
                    script.src = 'splash.js';
                    script.onload = function() {
                        console.log('Splash script loaded successfully.');
                    };
                    document.body.appendChild(script);
  });
}
            }
        }
    }


typeEffect();
