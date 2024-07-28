window.onload=function(){
fetch("splash.html")
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