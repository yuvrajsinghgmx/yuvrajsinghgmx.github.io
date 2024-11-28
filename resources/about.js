document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    const left = document.querySelectorAll(".left");
    const right = document.querySelectorAll(".right");

    let currentCardIndex = 0;
  
    const updateCards = () => {
        cards.forEach((card, index) => {
            if (index === currentCardIndex) {
                card.style.transform = "scale(1)";
                card.style.opacity = "1";
                card.classList.add("visible");
            } else {
                card.style.transform = "scale(0.8)";
                card.style.opacity = "0";
                card.classList.remove("visible");
            }
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentCardIndex);
        });
    };
    const toggleArrows = () => {
        left.forEach(btn => btn.style.visibility = currentCardIndex === 0 ? 'hidden' : 'visible');
        right.forEach(btn => btn.style.visibility = currentCardIndex === cards.length - 1 ? 'hidden' : 'visible');
    };    
    const scrollLeft = () => {
        if (currentCardIndex > 0) {
            currentCardIndex -= 1;
            updateCards();
        }
        toggleArrows();
    };
  
    const scrollRight = () => {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex += 1;
            updateCards();
        }
        toggleArrows();
    };
    document.querySelector(".page-container").addEventListener("click", (e) => {
        const pageWidth = window.innerWidth;
        const clickX = e.clientX;
  
        if (clickX < pageWidth / 2) {
            scrollLeft();
        } else {
            scrollRight();
        }
    });
  
    let startX = null;
  
    document.querySelector(".card-container").addEventListener("mousedown", (e) => {
        startX = e.clientX;
    });
  
    document.addEventListener("mouseup", (e) => {
        if (startX === null) return;
  
        const deltaX = e.clientX - startX;
  
        if (deltaX > 50) {
            scrollLeft();
        } else if (deltaX < -50) {
            scrollRight();
        }
  
        startX = null;
    });

    updateCards();

    let isScrolling = false;

    document.querySelector(".card-container").addEventListener("wheel", (e) => {
        e.preventDefault();
    
        if (isScrolling) return;
        isScrolling = true;
        if (e.deltaY > 0) {
            scrollRight();
        } else if (e.deltaY < 0) {
            scrollLeft();
        }
    
        setTimeout(() => {
            isScrolling = false;
        }, 300); 
    });
});
