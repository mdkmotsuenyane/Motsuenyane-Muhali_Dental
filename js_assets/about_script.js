
// DYNAMIC SEO MANAGEMENT FOR ABOUT PAGE

const SEO = {
  // About page metadata
  aboutPage: {
    title: 'About Us | Motsuenyane-Muhali Dental - Our Story & Mission',
    description: 'Learn about Motsuenyane-Muhali Dental in Sibasa. Established in 2022 by Mrs. Boitumelo Motsuenyane-Muhali. Professional dental care with a mission to eliminate dental diseases and promote oral health education.',
    keywords: 'Motsuenyane-Muhali Dental, Sibasa dentist, dental care Limpopo, Mrs Boitumelo Motsuenyane-Muhali, dental clinic Sibasa, teeth care, oral health education, South Africa dentist, dental team',
    ogTitle: 'About Motsuenyane-Muhali Dental | Our Story & Team',
    ogDescription: 'Founded in 2022 in Sibasa. Dedicated to eliminating dental diseases through quality care and oral health education. Meet our experienced team.',
    ogImage: 'https://www.motsuenyane-muhali-dental.co.za/_images/team.jpg',
    canonicalUrl: 'https://www.motsuenyane-muhali-dental.co.za/about.html'
  },

  // Initialize SEO for about page
  init() {
    this.updateMetaTags(this.aboutPage);
    this.updateStructuredData();
    this.addBreadcrumbs();
  },

  // Update meta tags dynamically
  updateMetaTags(data) {
    // Update title if not already set
    if (!document.title || document.title === 'About | Motsuenyane-Muhali Dental') {
      document.title = data.title;
    }

    // Update or create meta tags
    this.setMetaTag('name', 'description', data.description);
    this.setMetaTag('name', 'keywords', data.keywords);
    
    // Open Graph tags for social media
    this.setMetaTag('property', 'og:title', data.ogTitle);
    this.setMetaTag('property', 'og:description', data.ogDescription);
    this.setMetaTag('property', 'og:type', 'website');
    this.setMetaTag('property', 'og:url', data.canonicalUrl);
    this.setMetaTag('property', 'og:image', data.ogImage);
    this.setMetaTag('property', 'og:image:alt', 'Motsuenyane-Muhali Dental Team in Sibasa');
    
    // Twitter Card tags
    this.setMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setMetaTag('name', 'twitter:title', data.ogTitle);
    this.setMetaTag('name', 'twitter:description', data.ogDescription);
    this.setMetaTag('name', 'twitter:image', data.ogImage);
    
    // Additional SEO tags
    this.setMetaTag('name', 'robots', 'index, follow, max-image-preview:large');
    this.setMetaTag('name', 'googlebot', 'index, follow');
  },

  // Helper function to set or update meta tags
  setMetaTag(attr, key, content) {
    let element = document.querySelector(`meta[${attr}="${key}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  },

  // Update structured data
  updateStructuredData() {
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    
    // Only update if script doesn't exist or needs updating
    if (!existingScript) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Motsuenyane-Muhali Dental",
        "image": "https://www.motsuenyane-muhali-dental.co.za/_images/team.jpg",
        "description": "Professional dental care services in Sibasa, Limpopo. Established in 2022 by Mrs. Boitumelo Motsuenyane-Muhali. Quality treatment and oral health education.",
        "foundingDate": "2022",
        "founder": {
          "@type": "Person",
          "name": "Mrs. Boitumelo Motsuenyane-Muhali",
          "jobTitle": "Founder & Dentist"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gammbani complex (Shop no.4)",
          "addressLocality": "Sibasa",
          "addressRegion": "Limpopo",
          "postalCode": "0970",
          "addressCountry": "ZA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-22.949486",
          "longitude": "30.467563"
        },
        "telephone": "+27727888604",
        "email": "boitumelo.motsuenyane@gmail.com",
        "url": "https://www.motsuenyane-muhali-dental.co.za",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:00",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "08:00",
            "closes": "13:00"
          }
        ],
        "priceRange": "$",
        "slogan": "Happy Teeth, Happy Smile",
        "areaServed": {
          "@type": "City",
          "name": "Sibasa",
          "containedIn": {
            "@type": "State",
            "name": "Limpopo"
          }
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    }
  },

  // Add breadcrumb structured data
  addBreadcrumbs() {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.motsuenyane-muhali-dental.co.za/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://www.motsuenyane-muhali-dental.co.za/about.html"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.textContent = JSON.stringify(breadcrumbData, null, 2);
    document.head.appendChild(script);
  }
};
// PAGE TRANSITION ANIMATIONS


function navigateToPage(url) {
  document.body.classList.add('fade-out');
  
  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

// IMAGE OPTIMIZATION CLASS

class ImageOptimizer {
  constructor() {
    this.supportedFormats = this.checkFormatSupport();
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.connectionSpeed = this.getConnectionSpeed();
    this.init();
  }

  // Check browser support for modern image formats
  checkFormatSupport() {
    const formats = {
      webp: false,
      avif: false
    };

    // Check WebP support
    const webpCanvas = document.createElement('canvas');
    if (webpCanvas.getContext && webpCanvas.getContext('2d')) {
      formats.webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    return formats;
  }

  // Detect connection speed
  getConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === '4g') return 'fast';
        if (effectiveType === '3g') return 'medium';
        return 'slow';
      }
    }
    return 'medium';
  }

  // Get optimal image quality based on connection and device
  getOptimalQuality() {
    if (this.connectionSpeed === 'slow') return 'low';
    if (this.connectionSpeed === 'fast' && this.devicePixelRatio > 1) return 'high';
    return 'medium';
  }

  // Preload critical images
  preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
      const src = img.getAttribute('data-src') || img.src;
      if (src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }

  init() {
    this.preloadCriticalImages();
    console.log('Image Optimizer initialized:', {
      webpSupport: this.supportedFormats.webp,
      avifSupport: this.supportedFormats.avif,
      connectionSpeed: this.connectionSpeed,
      devicePixelRatio: this.devicePixelRatio
    });
  }
}

//Enhaced Lazy loading with optimization

//inspired by DeepSeekAi
document.addEventListener('DOMContentLoaded', function() {
  // Initialize image optimizer
  const imageOptimizer = new ImageOptimizer();
  
  const lazyImages = document.querySelectorAll('.lazy-image, img[loading="lazy"]');
  const loadingSpinner = document.getElementById('loadingSpinner');
  
  let loadedCount = 0;
  const totalImages = lazyImages.length;

  if (lazyImages.length > 0 && loadingSpinner) {
    loadingSpinner.style.display = 'block';
  }

  // Enhanced Intersection Observer with optimization
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src') || img.src;
        
        if (src) {
          // Create a new image to preload
          const tempImg = new Image();
          
          tempImg.onload = function() {
            img.src = src;
            img.classList.add('loaded');
            img.classList.remove('loading');
            img.removeAttribute('data-src');
            
            // Track loading progress
            loadedCount++;
            if (loadedCount === totalImages && loadingSpinner) {
              loadingSpinner.style.display = 'none';
            }
            
            // Dispatch custom event
            img.dispatchEvent(new CustomEvent('imageOptimized', {
              detail: { src: src, optimized: true }
            }));
          };
          
          tempImg.onerror = function() {
            console.error('Failed to load image:', src);
            img.classList.add('loaded');
            img.classList.remove('loading');
            
            // Try fallback if available
            const fallback = img.getAttribute('data-fallback');
            if (fallback) {
              img.src = fallback;
            }
            
            loadedCount++;
            if (loadedCount === totalImages && loadingSpinner) {
              loadingSpinner.style.display = 'none';
            }
          };
          
          tempImg.src = src;
        }
        observer.unobserve(img);
      }
    });
  }, {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
  });

  // Observe all lazy images
  lazyImages.forEach(img => {
    img.classList.add('loading');
    imageObserver.observe(img);
  });

  // Fallback for browsers that don't support Intersection Observer
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      const src = img.getAttribute('data-src') || img.src;
      if (src) {
        img.src = src;
        img.classList.add('loaded');
        img.classList.remove('loading');
        img.removeAttribute('data-src');
      }
    });
    if (loadingSpinner) {
      loadingSpinner.style.display = 'none';
    }
  }

  // Add loading state to images
  lazyImages.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.remove('loading');
      this.classList.add('loaded');
      
      console.log('Image loaded:', {
        src: this.src,
        naturalWidth: this.naturalWidth,
        naturalHeight: this.naturalHeight
      });
    });
    
    img.addEventListener('error', function() {
      this.classList.remove('loading');
      this.classList.add('error');
      console.error('Failed to load image:', this.alt || this.src);
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

// PROGRESSIVE IMAGE LOADING (BLUR-UP EFFECT)

class ProgressiveImageLoader {
  constructor() {
    this.init();
  }

  init() {
    const progressiveImages = document.querySelectorAll('img[data-lowsrc]');
    
    progressiveImages.forEach(img => {
      const lowSrc = img.getAttribute('data-lowsrc');
      const highSrc = img.getAttribute('data-src');
      
      // Load low-quality placeholder first
      img.src = lowSrc;
      img.style.filter = 'blur(10px)';
      img.style.transition = 'filter 0.5s ease';
      
      // Then load high-quality image
      const highResImg = new Image();
      highResImg.onload = function() {
        img.src = highSrc;
        img.style.filter = 'blur(0)';
        img.removeAttribute('data-lowsrc');
        img.removeAttribute('data-src');
      };
      highResImg.src = highSrc;
    });
  }
}


// Initialisation on page load

document.addEventListener('DOMContentLoaded', function() {
  // Initialize SEO
  SEO.init();

  // Initialize progressive image loader
  new ProgressiveImageLoader();

  // Remove fade-out class for smooth entry
  document.body.classList.remove('fade-out');
  
  // Add fade-in animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);

  // Update navigation buttons with smooth transitions
  const navButtons = document.querySelectorAll('.oval-button');
  navButtons.forEach(button => {
    const onclick = button.getAttribute('onclick');
    if (onclick && onclick.includes('location.href')) {
      const match = onclick.match(/location\.href='([^']+)'/);
      if (match && match[1]) {
        const targetUrl = match[1];
        button.addEventListener('click', function(e) {
          e.preventDefault();
          navigateToPage(targetUrl);
        });
        button.removeAttribute('onclick');
      }
    }
  });

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navToggle && navLinks) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    }
  });

  // Initialize AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true
    });
  }
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    document.body.classList.remove('fade-out');
    document.body.style.opacity = '1';
  }
});