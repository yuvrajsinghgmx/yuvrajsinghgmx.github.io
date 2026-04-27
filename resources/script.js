window.onload = function () {
  const splashscreen = document.getElementById("splashscreen");
  const Maincontent = document.getElementById("MainContent");

  function timedClassChange() {
    setTimeout(() => {
      splashscreen.classList.add("hidden");
      Maincontent.classList.remove("hidden");
    }, 2700);
  }
  timedClassChange();

  const tracker = document.getElementById("tracker");
  const target = document.getElementById("custom-cursor");
  const distance = 100;

  let targetX = 0,
    targetY = 0;
  let trackerX = 0,
    trackerY = 0;
  document.addEventListener("mousemove", (event) => {
    const cursor = document.getElementById("custom-cursor");
    cursor.style.left = `${event.pageX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${event.pageY - cursor.offsetHeight / 2}px`;
  });
  function updateTargetPosition() {
    const targetRect = target.getBoundingClientRect();
    targetX = targetRect.left + targetRect.width / 2;
    targetY = targetRect.top + targetRect.height / 2;
  }
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
  setTimeout(() => requestAnimationFrame(animateTracker), 1000);
  setInterval(updateTargetPosition, 50);

  const aboutbtn = document.getElementById("aboutbtn");
  const resumebtn = document.getElementById("resumebtn");
  const resume = document.getElementById("resume");
  const homebtn = document.getElementById("homebtn");
  const home = document.getElementById("home");
  const blogsbtn = document.getElementById("blogsbtn");
  const blogs = document.getElementById("blogs");
  const blogsHost = document.getElementById("blogs-host");
  const contactbtn = document.getElementById("contactbtn");
  const about = document.getElementById("about");
  const contact = document.getElementById("contact");
  const ahome = document.getElementById("ahome");
  const contactbtn2 = document.getElementById("contactbtn2");
  let blogsLoaded = false;

  function ensureBlogsScript() {
    return new Promise((resolve, reject) => {
      if (typeof window.initBlogsPage === "function") {
        resolve();
        return;
      }

      const existing = document.querySelector("script[data-blogs-script='1']");
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load blogs script")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "resources/blogs.js";
      script.setAttribute("data-blogs-script", "1");
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load blogs script"));
      document.body.appendChild(script);
    });
  }

  async function loadBlogsSection() {
    if (blogsLoaded || !blogsHost) return;

    const response = await fetch("blogs.html?embed=1", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to load blogs content");
    }

    const html = await response.text();
    const parsed = new DOMParser().parseFromString(html, "text/html");
    const blogsLayout = parsed.querySelector(".blogs-layout");

    if (!blogsLayout) {
      throw new Error("Blogs layout not found");
    }

    const shadowRoot = blogsHost.shadowRoot || blogsHost.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <link rel="stylesheet" href="resources/blogs.css">
      <div class="blogs-embedded">${blogsLayout.outerHTML}</div>
    `;

    await ensureBlogsScript();

    if (typeof window.initBlogsPage === "function") {
      window.initBlogsPage(shadowRoot);
    }

    blogsLoaded = true;
  }

  function showSection(sectionToShow) {
    const sections = [about, blogs, resume, home, contact];
    sections.forEach((section) => {
      if (section === sectionToShow) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

    if (sectionToShow === blogs) {
      window.history.replaceState({}, "", "#blogs");
    }
  }

  aboutbtn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(about);
  });

  blogsbtn.addEventListener("click", (event) => {
    event.preventDefault();
    loadBlogsSection().catch(() => {
      if (blogsHost) {
        blogsHost.innerHTML = "<p style='padding:16px;'>Unable to load blogs right now.</p>";
      }
    }).finally(() => {
      showSection(blogs);
    });
  });

  const initialParams = new URLSearchParams(window.location.search);
  const shouldOpenBlogs = window.location.hash === "#blogs" || initialParams.get("section") === "blogs";

  if (shouldOpenBlogs) {
    loadBlogsSection().catch(() => {
      if (blogsHost) {
        blogsHost.innerHTML = "<p style='padding:16px;'>Unable to load blogs right now.</p>";
      }
    }).finally(() => {
      showSection(blogs);
    });
  } else {
    if (blogsHost) {
      blogsHost.innerHTML = "";
    }
  }

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
