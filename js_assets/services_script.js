// Page transition function
function navigateToPage(url) {
  // Add fade-out class to body
  document.body.classList.add('fade-out');
  
  // Wait for transition to complete then navigate
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

// Update navigation buttons to use smooth transitions
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.oval-button');
  navButtons.forEach(button => {
    const originalOnClick = button.getAttribute('onclick');
    if (originalOnClick && originalOnClick.includes('location.href')) {
      // Extract the URL from the onclick attribute
      const urlMatch = originalOnClick.match(/location\.href='([^']+)'/);
      if (urlMatch) {
        const url = urlMatch[1];
        // Remove the original onclick
        button.removeAttribute('onclick');
        // Add new click handler with smooth transition
        button.addEventListener('click', function(e) {
          e.preventDefault();
          navigateToPage(url);
        });
      }
    }
  });
});

// Toggle nav links when clicking menu icon
document.getElementById('navToggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('show');
});
 //inspired by claude Ai

// Close nav if clicking outside it
document.addEventListener('click', function (e) {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  /* If the click is outside navLinks and navToggle, close the nav */
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('show');
  }
});

// Handle browser back/forward buttons
window.addEventListener('pageshow', function(event) {
  // If the page is loaded from cache, remove fade-out class
  if (event.persisted) {
    document.body.classList.remove('fade-out');
    document.body.style.opacity = '1';
  }
});

// Enhanced SEO and Performance Features
class SEOOptimizer {
    constructor() {
        this.init();
    }
     /* Initialize SEO optimizations */
    init() {
        this.trackPagePerformance();
        this.updateStructuredData();
        this.handleDynamicContent();
        this.setupAnalytics();
    }

    trackPagePerformance() {
        // Track page load time
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // Good for SEO loads fast 
                if (loadTime < 3000) {
                    console.log('Excellent page load performance for SEO');
                }
            }
        });
    }

    updateStructuredData() {
        // Update schema with current page info and services
        const services = this.extractServices();
        
        const pageSchema = {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Motsuenyane-Muhali Dental",
            "description": "Comprehensive dental services in Sibasa including check-ups, cleanings, extractions, fillings, and more",
            "url": window.location.href,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gammbani complex (Shop no.4)",
                "addressLocality": "Sibasa",
                "postalCode": "0970",
                "addressCountry": "ZA"
            },
            "telephone": "+27727888604",
            "medicalSpecialty": "Dentistry",
            "availableService": services
        };
         /* Inject or update JSON-LD schema in the document head */
        this.injectSchema(pageSchema, 'page-schema');
    }

    extractServices() {
        // Extract services from the cards on the page
        const serviceCards = document.querySelectorAll('.card');
        const services = [];
        /* Loop through each card and extract title and description */
        serviceCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.trim();
            const description = card.querySelector('p')?.textContent.trim();
            /* Only add if both title and description exist */
            if (title && description) {
                services.push({
                    "@type": "MedicalProcedure",
                    "name": title,
                    "description": description
                });
            }
        });
        
        return services;
    }
      /* Inject JSON-LD schema into the document head */
    injectSchema(schema, id) {
        const existingScript = document.getElementById(id);
        if (existingScript) {
            existingScript.remove();
        }
           /* Create and append new script */
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    handleDynamicContent() {
        // Track user engagement
        let timeOnPage = 0;
        const startTime = Date.now();
        
        setInterval(() => {
            timeOnPage = Math.floor((Date.now() - startTime) / 1000);
            
            // Mark content as engaged (good for SEO)
            if (timeOnPage > 30 && !document.body.hasAttribute('data-engaged')) {
                document.body.setAttribute('data-engaged', 'true');
                console.log('User engaged with content - positive SEO signal');
            }
        }, 1000);

        // Track scroll depth
        this.trackScrollDepth();
        
        // Track clicks and interactions
        this.trackUserInteractions();
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.floor(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            maxScroll = Math.max(maxScroll, scrollDepth);
            
            // Update engagement based on scroll
            if (maxScroll > 75 && !document.body.hasAttribute('data-scrolled-deep')) {
                document.body.setAttribute('data-scrolled-deep', 'true');
                console.log('User scrolled deeply - positive engagement signal');
            }
        });
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.oval-button')) {
                const button = e.target.closest('.oval-button');
                const buttonText = button.textContent.trim();
                console.log(`User clicked: ${buttonText}`);
            }
            
            // Track service card clicks
            if (e.target.closest('.card')) {
                const card = e.target.closest('.card');
                const serviceName = card.querySelector('h3')?.textContent.trim();
                console.log(`User viewed service: ${serviceName}`);
            }
        });
    }

    setupAnalytics() {
        // Simple analytics for user behavior
        window.dataLayer = window.dataLayer || [];
        
        // Track virtual pageviews for SPA navigation
        window.trackPageView = (page) => {
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: page
                });
            }
        };
    }
}

// Service Cards Animation
class ServiceCardsAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.observeCards();
        this.addCardInteractions();
    }

    observeCards() {
        // Intersection Observer for card animations
        const cards = document.querySelectorAll('.card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Stagger animation
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    }

    addCardInteractions() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s ease';
            });
            
            // Track which services users are interested in
            card.addEventListener('click', () => {
                const serviceName = card.querySelector('h3')?.textContent;
                console.log(`User interested in: ${serviceName}`);
            });
        });
    }
}

// Mobile navigation handler
class MobileNavigation {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = document.getElementById('navLinks');
        this.init();
    }

    init() {
        if (!this.navToggle || !this.navLinks) return;
        
        this.setupToggle();
        this.setupOutsideClick();
    }

    setupToggle() {
        this.navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = this.navLinks.classList.toggle('show');
            this.navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Track mobile menu usage
            console.log('Mobile menu toggled:', isExpanded ? 'opened' : 'closed');
        });
    }

    setupOutsideClick() {
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.navToggle.contains(e.target)) {
                this.navLinks.classList.remove('show');
                this.navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks.classList.contains('show')) {
                this.navLinks.classList.remove('show');
                this.navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Main application initializer
class DentalServicesApp {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Remove initial fade-out class
        document.body.classList.remove('fade-out');
        
        // Initialize all components
        this.initializeComponents();
        
        // Set up global event listeners
        this.setupGlobalListeners();
        
        console.log('Motsuenyane-Muhali Dental Services app initialized');
    }

    initializeComponents() {
        // Initialize all feature components
        this.components.seo = new SEOOptimizer();
        this.components.cardsAnimator = new ServiceCardsAnimator();
        this.components.mobileNav = new MobileNavigation();
    }

    setupGlobalListeners() {
        // Handle browser back/forward navigation
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                document.body.classList.remove('fade-out');
            }
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                console.log('Page became visible');
            }
        });
    }

    // Public method to refresh components if needed
    refresh() {
        if (this.components.cardsAnimator) {
            this.components.cardsAnimator.init();
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create global app instance
    window.dentalServicesApp = new DentalServicesApp();
});

// Add smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEOOptimizer,
        ServiceCardsAnimator,
        MobileNavigation,
        DentalServicesApp
    };
}
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
        }); document.addEventListener('DOMContentLoaded', function() {
            // Lazy loading implementation
            const lazyImages = document.querySelectorAll('.lazy-image');
            const loadingSpinner = document.getElementById('loadingSpinner');
        });
            
            let loadedCount = 0;
            const totalImages = lazyImages.length;