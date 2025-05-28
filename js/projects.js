// Projects Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
  initProjectFilters();
});

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterButtons.length || !projectCards.length) return;
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      filterProjects(filterValue, projectCards);
    });
  });
}

function filterProjects(filter, projects) {
  projects.forEach(project => {
    // Get project category
    const category = project.getAttribute('data-category');
    
    // Reset animations
    project.style.animation = '';
    
    // Show all projects if filter is 'all', otherwise show only matching projects
    if (filter === 'all' || filter === category) {
      project.style.display = 'block';
      // Add animation with small delay based on index
      setTimeout(() => {
        project.style.animation = 'scale-in 0.5s ease forwards';
      }, 50);
    } else {
      project.style.display = 'none';
    }
  });
}

// Add reveal animations for projects on scroll
function initProjectsReveal() {
  const projects = document.querySelectorAll('.project-card');
  const revealPoint = 150;
  
  function revealProjects() {
    projects.forEach((project, index) => {
      const projectTop = project.getBoundingClientRect().top;
      
      if (projectTop < window.innerHeight - revealPoint) {
        setTimeout(() => {
          project.classList.add('fade-in');
        }, index * 100);
      }
    });
  }
  
  window.addEventListener('scroll', revealProjects);
  
  // Initial check
  revealProjects();
}

// Initialize on load
window.addEventListener('load', initProjectsReveal);