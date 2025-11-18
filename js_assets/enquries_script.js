// Page transition function - creates smooth fade effect when navigating
function navigateToPage(url) {
  // Add fade-out class to body for exit animation
  document.body.classList.add('fade-out');
  
  // Wait for transition to complete then navigate to new page
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

// Initialize page transitions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Remove fade-out class if it exists (for back/forward navigation)
  document.body.classList.remove('fade-out');
  
  // Add fade-in animation to body
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});

// declare form elements
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const cellphone = document.getElementById('cellphone');
const date = document.getElementById('date');
const time = document.getElementById('time');
const service = document.getElementById('service');
const errorElement = document.getElementById('error');
const form = document.getElementById('form');

// Track submission attempts
let attemptCount = 0;
const maxAttempts = 5;

// Update navigation buttons to use smooth transitions
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.oval-button');
  navButtons.forEach(button => {
    // Get the href attribute instead of onclick
    const targetUrl = button.getAttribute('href');
    if (targetUrl && targetUrl.trim() !== '') {
      // Add new click handler with smooth transition
      button.addEventListener('click', function(e) {
        e.preventDefault();
        navigateToPage(targetUrl);
      });
    }
  });
});

//Form submission event listener
form.addEventListener("submit", (e) => {
  // prevents page from reloading or opening a windoes file
  e.preventDefault(); 

  // Check if already blocked
  if (attemptCount > maxAttempts) {
    errorElement.innerText = "You have been blocked from submitting the form after 5 invalid attempts.";
    errorElement.style.display = 'block';
    return;
  }

  //declaration for error message
  let messages = [];

  // Remove previous visual errors
  [fullName, email, cellphone, date, time, service].forEach(input => {
    input.classList.remove('invalid');
  });

  // Validation 
// Name validation
  if (fullName.value.trim() === '') {
    messages.push("Name is required");
    fullName.classList.add('invalid');
  }
   
  // Email validation
  if (email.value.trim() === '') {
    messages.push("Email is required");
    email.classList.add('invalid');
    // Added visual error class
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    messages.push("Enter a valid email address");
    email.classList.add('invalid');
  }
// Cellphone validation
  if (cellphone.value.trim() === '') {
    messages.push("Cellphone number is required");
    cellphone.classList.add('invalid');
  } else if (!/^0\d{9}$/.test(cellphone.value.trim())) {
    messages.push("Cellphone number must be 10 digits and start with 0");
    cellphone.classList.add('invalid');
  }
// Date validation
  if (date.value.trim() === '') {
    messages.push("Date of appointment is required");
    date.classList.add('invalid');
  } else {
    const today = new Date();
    // remove time part
    today.setHours(0, 0, 0, 0); 
    const selectedDate = new Date(date.value);
    if (selectedDate < today) {
      messages.push("Date cannot be in the past");
      date.classList.add('invalid');
    }
  }
// Time validation
  if (time.value.trim() === '') {
    messages.push("Time of appointment is required");
    time.classList.add('invalid');
  } else {
    const minTime = "07:30";
    const maxTime = "17:00";
    const userTime = time.value;

    if (userTime < minTime || userTime > maxTime) {
      messages.push("Appointment time must be between 07:30 and 17:00");
      time.classList.add('invalid');
    }
  }

  //service validation
  if (service.value === '') {
    messages.push("Please select a service");
    service.classList.add('invalid');
  }

  // If there are errors, prevent form submission and display errors
  if (messages.length > 0) {
    // increase attempts on each INVALID submission only
    attemptCount++; 
    errorElement.innerText = messages.join(', ');
    errorElement.style.display = 'block';
  } else {
    // Form is valid, proceed with submission NO attempt increase for valid data
    alert("Appointment successfully submitted! Preparing confirmation...");

    // Show loading state
    const submitButton = form.querySelector('input[type="submit"]');
    const originalValue = submitButton.value;
    submitButton.value = 'Preparing...';
    submitButton.disabled = true;

    // Hide error element
    errorElement.style.display = 'none';

    //inspired by claude Ai

    // Create email content optimized for all email clients
    const emailSubject = `Dental Appointment Request - ${fullName.value}`;
    const emailBody = `
Dear Motsuenyane-Muhali Dental,

I would like to book a dental appointment with the following details:

PATIENT INFORMATION:
• Full Name: ${fullName.value}
• Email Address: ${email.value}
• Phone Number: ${cellphone.value}

APPOINTMENT PREFERENCES:
• Preferred Date: ${date.value}
• Preferred Time: ${time.value}
• Service Required: ${service.value}

This appointment request was submitted through your website booking form.

Please contact me to confirm availability and finalize the appointment.

Thank you,
${fullName.value}
    `.trim();

    // Oprn email client function
    const openEmailClient = () => {
      return new Promise((resolve) => {
        try {
          // Encode subject and body for URL
          const encodedSubject = encodeURIComponent(emailSubject);
          const encodedBody = encodeURIComponent(emailBody);
          
          // Create mailto link - UPDATED EMAIL ADDRESS
          const mailtoLink = `mailto:boitumelo.motsuenyane@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
          
          // Method 1: Direct window location (works in most browsers)
          setTimeout(() => {
            window.location.href = mailtoLink;
            resolve(true);
          }, 100);
          
        } catch (error) {
          console.error('Email client error:', error);
          resolve(false);
        }
      });
    };

    // COPY TO CLIPBOARD WITH FALLBACKS
    const copyEmailToClipboard = () => {
      const emailContent = `
To: boitumelo.motsuenyane@gmail.com
Subject: ${emailSubject}

${emailBody}
      `.trim();

      return new Promise((resolve) => {
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(emailContent)
            .then(() => {
              console.log('Copied to clipboard using modern API');
              resolve(true);
            })
            .catch(() => {
              // Fallback to legacy method
              fallbackCopyToClipboard(emailContent);
              resolve(true);
            });
        } else {
          // Legacy method for older browsers
          fallbackCopyToClipboard(emailContent);
          resolve(true);
        }
      });
    };

    // Legacy clipboard method
    const fallbackCopyToClipboard = (text) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        console.log('Copied to clipboard using legacy method');
      } catch (err) {
        console.error('Failed to copy using legacy method:', err);
      }
      
      document.body.removeChild(textArea);
    };

    // Execute email sending logic
    setTimeout(async () => {
      let emailOpened = false;
      
      try {
        // Try to open email client
        emailOpened = await openEmailClient();
        
        // Wait a moment to see if email client opens
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (emailOpened) {
          // Success - email client opened
          alert("APPOINTMENT REQUEST SENT!\n\nYour email client has opened with a pre-filled email to Motsuenyane-Muhali Dental.\n\nPLEASE CLICK 'SEND' TO COMPLETE YOUR BOOKING!");
        } else {
          // Email client didn't open, use clipboard method
          throw new Error('Email client not available');
        }
        
      } catch (error) {
        console.log('Email client method failed, using clipboard:', error);
        
        // Use clipboard method as backup
        await copyEmailToClipboard();
        
        alert(`APPOINTMENT REQUEST READY!\n\nYour appointment details have been copied to clipboard.\n\nPLEASE:\n1. Open your email (Gmail, Outlook, Yahoo, etc.)\n2. Create new email to: boitumelo.motsuenyane@gmail.com\n3. Paste the content (Ctrl+V / Cmd+V)\n4. Click SEND to confirm your appointment!`);
      }

      // Reset form and button state after submission process
      form.reset();
      attemptCount = 0;
      submitButton.value = originalValue;
      submitButton.disabled = false;
      
    }, 500);
  }
});

// Clear error messages when user starts typing in any field
[fullName, email, cellphone, date, time, service].forEach(input => {
  input.addEventListener('input', () => {
    errorElement.innerText = '';
    errorElement.style.display = 'none';
    input.classList.remove('invalid');
  });
});

// Toggle nav links when clicking menu icon
document.getElementById('navToggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('show');
});

// Smooth scroll & close menu on link click
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    // Smooth scroll to section
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }

    // Close nav after clicking a link
    document.getElementById('navLinks').classList.remove('show');
  });
});

// Close nav if clicking outside it
document.addEventListener('click', function (e) {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('show');
  }
});

// Initialize AOS (Animate On Scroll) library
AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
});

// Handle browser back/forward buttons
window.addEventListener('pageshow', function(event) {
  // If the page is loaded from cache, remove fade-out class
  if (event.persisted) {
    document.body.classList.remove('fade-out');
    document.body.style.opacity = '1';
  }
});
 document.addEventListener('DOMContentLoaded', function() {
      // Lazy loading implementation
      const lazyImages = document.querySelectorAll('.lazy-image');
      const loadingSpinner = document.getElementById('loadingSpinner');
      
      let loadedCount = 0;
      const totalImages = lazyImages.length;

      if (lazyImages.length > 0) {
          loadingSpinner.style.display = 'block';
      }

      const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  const src = img.getAttribute('data-src');
                  
                  if (src) {
                      img.src = src;
                      img.classList.add('loaded');
                      img.removeAttribute('data-src');
                      
                      // Track loading progress
                      loadedCount++;
                      if (loadedCount === totalImages) {
                          loadingSpinner.style.display = 'none';
                      }
                  }
                  observer.unobserve(img);
              }
          });
      });

      lazyImages.forEach(img => imageObserver.observe(img));

      // Fallback for browsers that don't support Intersection Observer
      if (!('IntersectionObserver' in window)) {
          lazyImages.forEach(img => {
              const src = img.getAttribute('data-src');
              if (src) {
                  img.src = src;
                  img.classList.add('loaded');
                  img.removeAttribute('data-src');
              }
          });
          loadingSpinner.style.display = 'none';
      }

      // Add loading state to images
      lazyImages.forEach(img => {
          img.addEventListener('load', function() {
              this.classList.remove('loading');
              this.classList.add('loaded');
          });
          
          img.addEventListener('error', function() {
              this.classList.remove('loading');
              console.error('Failed to load image:', this.alt);
          });
      });

      // Track visited links
      const trackVisitedLinks = function() {
          const links = document.querySelectorAll('a[href]');
          links.forEach(link => {
              link.addEventListener('click', function() {
                  sessionStorage.setItem('visited-' + this.href, 'true');
              });
          });
      };
      trackVisitedLinks();
  }); 
  document.addEventListener('DOMContentLoaded', function() {
      // Lazy loading implementation
      const lazyImages = document.querySelectorAll('.lazy-image');
      const loadingSpinner = document.getElementById('loadingSpinner');
  });
      
      let loadedCount = 0;
      const totalImages = lazyImages.length;