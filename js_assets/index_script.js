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
    // Get the data-href or href attribute
    const targetUrl = button.getAttribute('data-href') || button.getAttribute('href');
    if (targetUrl && targetUrl.trim() !== '') {
      // Add new click handler with smooth transition
      button.addEventListener('click', function(e) {
        e.preventDefault();
        navigateToPage(targetUrl);
      });
    }
  });
});

// Enhanced SEO and Performance Features
class SEOOptimizer {
    constructor() {
        this.init();
    }

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
                
                // Good for SEO: Fast load times
                if (loadTime < 3000) {
                    console.log('Excellent page load performance for SEO');
                }
            }
        });
    }

    //inspiredby claudeAi

    updateStructuredData() {
        // Update schema with current page info
        const pageSchema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": document.title,
            "description": document.querySelector('meta[name="description"]')?.content || 'Professional dental care in Sibasa',
            "url": window.location.href,
            "lastReviewed": new Date().toISOString().split('T')[0]
        };

        this.injectSchema(pageSchema, 'page-schema');
    }

    injectSchema(schema, id) {
        const existingScript = document.getElementById(id);
        if (existingScript) {
            existingScript.remove();
        }

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
            
            if (e.target.closest('a[data-navigation]')) {
                console.log('User clicked navigation link');
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

// Enhanced lazy loading with better performance
class LazyLoader {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
        }
        this.loadCriticalImages();
        this.observeImages();
    }

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                this.loadImage(img);
                observer.unobserve(img);
            }
        });
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            if (this.observer) {
                this.observer.observe(img);
            } else {
                // Fallback for older browsers
                this.loadImage(img);
            }
        });
    }

    loadCriticalImages() {
        // Load above-the-fold images immediately
        const criticalImages = document.querySelectorAll('img[data-src][data-critical]');
        criticalImages.forEach(img => this.loadImage(img));
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        // Add loading state
        img.classList.add('loading');
        
        const tempImage = new Image();
        tempImage.onload = () => {
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            
            // Dispatch event for potential analytics
            img.dispatchEvent(new CustomEvent('lazyloaded'));
        };
        tempImage.onerror = () => {
            console.warn('Failed to load image:', src);
            img.classList.remove('loading');
            img.classList.add('loaded');
            img.dispatchEvent(new CustomEvent('lazyloaderror'));
        };
        tempImage.src = src;
    }
}

// Connection-aware optimization
class ConnectionOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeForConnection();
        this.setupConnectionListeners();
    }

    optimizeForConnection() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Use lower quality images for slow connections
            if (connection.saveData || connection.effectiveType.includes('2g')) {
                document.querySelectorAll('img[data-src]').forEach(img => {
                    const originalSrc = img.getAttribute('data-src');
                    const lowQualitySrc = originalSrc.replace('.jpg', '-low.jpg');
                    img.setAttribute('data-src', lowQualitySrc);
                });
                
                console.log('Optimized for slow connection:', connection.effectiveType);
            }
        }
    }

    setupConnectionListeners() {
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', this.optimizeForConnection.bind(this));
        }
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
class DentalApp {
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
        
        console.log('Motsuenyane-Muhali Dental app initialized');
    }

    initializeComponents() {
        // Initialize all feature components
        this.components.seo = new SEOOptimizer();
        this.components.lazyLoader = new LazyLoader();
        this.components.connectionOptimizer = new ConnectionOptimizer();
        this.components.mobileNav = new MobileNavigation();
        
        // Initialize animations if AOS is available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'slide',
                once: true
            });
        }
    }

    setupGlobalListeners() {
        // Handle browser back/forward navigation
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                document.body.classList.remove('fade-out');
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
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
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create global app instance
    window.dentalApp = new DentalApp();
});

// Handle navigation links with data-navigation attribute
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[data-navigation]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage(this.href);
        });
    });
});

// Handle browser back/forward buttons
window.addEventListener('pageshow', function(event) {
  // If the page is loaded from cache, remove fade-out class
  if (event.persisted) {
    document.body.classList.remove('fade-out');
    document.body.style.opacity = '1';
  }
});

// Export classes for testing or further use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEOOptimizer,
        LazyLoader,
        ConnectionOptimizer,
        MobileNavigation,
        DentalApp
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
}); 
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading implementation
    const lazyImages = document.querySelectorAll('.lazy-image');
    const loadingSpinner = document.getElementById('loadingSpinner');
});

    let loadedCount = 0;
    const totalImages = lazyImages.length;