// script.js
// Handles theme toggling, dynamic animations and interactive behaviours

// When the DOM is fully loaded, initialise the page
document.addEventListener('DOMContentLoaded', () => {
  // Set the current year in the footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Initialise theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  // Bind theme toggle button
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      // Rotate the icon for fun effect
      toggleButton.classList.toggle('rotate');
    });
  }

  // Animate sections on scroll using IntersectionObserver
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Trigger progress bar animation when skills section becomes visible
        if (entry.target.id === 'skills') {
          animateProgressBars();
        }
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));
});

// Animate the widths of progress bars based on their data attribute
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar');
  bars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width') || bar.style.width;
    // Reset first to allow animation to restart when toggling themes or revisiting
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth + '%';
    }, 100);
  });
}