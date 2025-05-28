// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
});

function initScrollAnimations() {
  // Elements to animate on scroll
  const elementsToAnimate = [
    { selector: '.about-image', animation: 'slide-in-left' },
    { selector: '.about-text', animation: 'slide-in-right' },
    { selector: '.skills', animation: 'fade-in' },
    { selector: '.skill', animation: 'slide-up' },
    { selector: '.contact-info', animation: 'slide-in-left' },
    { selector: '.contact-form', animation: 'slide-in-right' },
    { selector: '.section-header', animation: 'fade-in' }
  ];
  
  // Intersection Observer options
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // Create an observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply the animation class
        const animationClass = entry.target.dataset.animation;
        if (animationClass) {
          entry.target.classList.add(animationClass);
          
          // Stop observing after animation is applied
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);
  
  // Setup elements for observation
  elementsToAnimate.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    
    elements.forEach((element, index) => {
      // Add animation class as data attribute
      element.dataset.animation = item.animation;
      
      // Add delay class based on index
      if (index > 0) {
        element.classList.add(`delay-${index * 100}`);
      }
      
      // Start observing the element
      observer.observe(element);
    });
  });
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage) {
    // Move the image slightly based on scroll position
    heroImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
  }
});

// Add animation to skill bars
function animateSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  skillLevels.forEach(skill => {
    const width = skill.style.width;
    
    // Reset width to 0
    skill.style.width = '0%';
    
    // Animate to actual width
    setTimeout(() => {
      skill.style.transition = 'width 1.5s ease-in-out';
      skill.style.width = width;
    }, 300);
  });
}

// Initialize skill bar animation when visible
function initSkillBarAnimation() {
  const skillsSection = document.querySelector('.skills');
  
  if (!skillsSection) return;
  
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  observer.observe(skillsSection);
}

// Run after DOM is loaded
window.addEventListener('load', initSkillBarAnimation);