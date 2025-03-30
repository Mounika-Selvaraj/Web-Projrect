document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll(".fade-in");

  const fadeInOnScroll = () => {
      fadeInElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50) {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
          }
      });
  };

  // Trigger fade-in effect on scroll
  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // Trigger once on load
});
