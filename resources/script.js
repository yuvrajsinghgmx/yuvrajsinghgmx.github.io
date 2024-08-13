window.onload = function () {
  const splashscreen = document.getElementById("splashscreen");
  const Maincontent = document.getElementById("MainContent");

  function timedClassChange() {
    setTimeout(() => {
      splashscreen.classList.add("hidden");
      Maincontent.classList.remove("hidden");
    }, 2300);
  }
  timedClassChange();

  const tracker = document.getElementById("tracker");
  const target = document.getElementById("custom-cursor");
  const distance = 100;

  let targetX = 0,
    targetY = 0;
  let trackerX = 0,
    trackerY = 0;

  // Update custom cursor position
  document.addEventListener("mousemove", (event) => {
    const cursor = document.getElementById("custom-cursor");
    cursor.style.left = `${event.clientX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${event.clientY - cursor.offsetHeight / 2}px`;
  });

  // Animate tracker with distance
  function animateTracker() {
    const angle = Math.atan2(trackerY - targetY, trackerX - targetX);
    const desiredX = targetX + Math.cos(angle) * distance;
    const desiredY = targetY + Math.sin(angle) * distance;
    trackerX += (desiredX - trackerX) / 10;
    trackerY += (desiredY - trackerY) / 10;
    tracker.style.left = trackerX + "px";
    tracker.style.top = trackerY + "px";
    requestAnimationFrame(animateTracker);
  }

  // Update target position
  function updateTargetPosition() {
    const targetRect = target.getBoundingClientRect();
    targetX = targetRect.left + targetRect.width / 2;
    targetY = targetRect.top + targetRect.height / 2;
  }

  // Start the tracker animation after a 1-second delay
  setTimeout(() => requestAnimationFrame(animateTracker), 1000);
  setInterval(updateTargetPosition, 50);

  const aboutbtn = document.getElementById("aboutbtn");
  const resumebtn = document.getElementById("resumebtn");
  const resume = document.getElementById("resume");
  const homebtn = document.getElementById("homebtn");
  const home = document.getElementById("home");
  const contactbtn = document.getElementById("contactbtn");
  const about = document.getElementById("about");
  const contact = document.getElementById("contact");
  const ahome = document.getElementById("ahome");
  const contactbtn2 = document.getElementById("contactbtn2");

  function showSection(sectionToShow) {
    const sections = [about, resume, home, contact];
    sections.forEach((section) => {
      if (section === sectionToShow) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
  }

  aboutbtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(about);
  });

  resumebtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(resume);
  });

  contactbtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(contact);
  });

  homebtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(home);
  });
  ahome.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(home);
  });
  contactbtn2.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(contact);
  });
};
