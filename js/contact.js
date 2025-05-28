// Contact Form Functionality

document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!validateForm(name, email, subject, message)) {
      return;
    }
    
    // Normally, here we would send the form data to a server
    // For this demo, we'll just show a success message
    showSuccessMessage(contactForm);
    
    // Reset form
    contactForm.reset();
  });
}

function validateForm(name, email, subject, message) {
  let isValid = true;
  const errorMessages = [];
  
  // Check if fields are empty
  if (!name) {
    errorMessages.push('Please enter your name');
    isValid = false;
  }
  
  if (!email) {
    errorMessages.push('Please enter your email');
    isValid = false;
  } else if (!isValidEmail(email)) {
    errorMessages.push('Please enter a valid email address');
    isValid = false;
  }
  
  if (!subject) {
    errorMessages.push('Please enter a subject');
    isValid = false;
  }
  
  if (!message) {
    errorMessages.push('Please enter your message');
    isValid = false;
  }
  
  // Show error message if validation fails
  if (!isValid) {
    showErrorMessage(errorMessages);
  }
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showErrorMessage(messages) {
  // Remove existing message if any
  removeFormMessages();
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-message error';
  errorDiv.style.color = 'red';
  errorDiv.style.marginBottom = '16px';
  
  // Add each error message
  messages.forEach(message => {
    const p = document.createElement('p');
    p.textContent = message;
    errorDiv.appendChild(p);
  });
  
  // Insert at the top of the form
  const contactForm = document.getElementById('contact-form');
  contactForm.insertBefore(errorDiv, contactForm.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(removeFormMessages, 5000);
}

function showSuccessMessage(form) {
  // Remove existing message if any
  removeFormMessages();
  
  // Create success message
  const successDiv = document.createElement('div');
  successDiv.className = 'form-message success';
  successDiv.style.color = 'green';
  successDiv.style.marginBottom = '16px';
  successDiv.style.padding = '12px';
  successDiv.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
  successDiv.style.borderRadius = '4px';
  
  const p = document.createElement('p');
  p.textContent = 'Thanks for your message! I\'ll get back to you soon.';
  successDiv.appendChild(p);
  
  // Insert at the top of the form
  form.insertBefore(successDiv, form.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(removeFormMessages, 5000);
}

function removeFormMessages() {
  const messages = document.querySelectorAll('.form-message');
  messages.forEach(message => message.remove());
}