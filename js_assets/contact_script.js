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
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }
});

// Close nav if clicking outside it
document.addEventListener('click', function (e) {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  if (navLinks && navToggle) {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('show');
    }
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

// Initialize Leaflet Map
function initMap() {
  // Coordinates for Motsuenyane-Muhali Dental in Sibasa
  const location = [-22.949486, 30.467563];
  
  // Create map centered on the dental practice
  const map = L.map('map').setView(location, 15);
  
  // Add OpenStreetMap tiles (free, no API key required)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  
  // Create custom icon for marker
  const dentalIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  // Add marker to the map
  const marker = L.marker(location, { icon: dentalIcon }).addTo(map);
  
  // Create popup content
  const popupContent = `
    <div style="min-width: 200px;">
      <h3>Motsuenyane-Muhali Dental</h3>
      <p><strong>Address:</strong><br>
      Gammbani complex (Shop no.4)<br>
      Sibasa, 0970, Limpopo</p>
      <p><strong>Phone:</strong> <a href="tel:+27727888604">072 788 8604</a></p>
      <p><strong>Hours:</strong> Mon-Fri, 08:00-17:00</p>
      <a href="https://www.google.com/maps/dir/?api=1&destination=-22.949486,30.467563" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="directions-link">
          Get Directions
      </a>
    </div>
  `;
  
  // Bind popup to marker
  marker.bindPopup(popupContent);
  
  // Open popup by default
  marker.openPopup();
  
  console.log('Leaflet map initialized successfully');
}

// Load map when page is ready
window.addEventListener('load', function() {
  // Check if Leaflet is loaded and map container exists
  if (typeof L !== 'undefined' && document.getElementById('map')) {
    initMap();
  } else {
    console.log('Leaflet or map container not available');
  }
});

// Add smooth scroll animation for any anchor links
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

// Add loading animation for map
document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.classList.add('loading');
    
    // Remove loading class when map is ready
    setTimeout(() => {
      mapContainer.classList.remove('loading');
    }, 2000);
  }
});

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

    // Check AVIF support 
    const avifImage = new Image();
    avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    avifImage.onload = () => {
      formats.avif = true;
    };

    return formats;
  }

  // Detect connection speed
  getConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        // Return quality based on connection: slow, medium, fast
        if (effectiveType === '4g') return 'fast';
        if (effectiveType === '3g') return 'medium';
        return 'slow';
      }
    }
    // Default to medium quality
    return 'medium'; 
  }

  // Get optimal image quality based on connection and device
  getOptimalQuality() {
    if (this.connectionSpeed === 'slow') return 'low';
    if (this.connectionSpeed === 'fast' && this.devicePixelRatio > 1) return 'high';
    return 'medium';
  }

  // Generate responsive image URL
  getResponsiveImageUrl(src, width) {
    // If image has optimization parameters, use them
    const quality = this.getOptimalQuality();
    const extension = src.split('.').pop().toLowerCase();
    
    // Check if we should serve WebP or AVIF
    let optimizedSrc = src;
    
    if (this.supportedFormats.avif) {
      optimizedSrc = src.replace(`.${extension}`, `.avif`);
    } else if (this.supportedFormats.webp) {
      optimizedSrc = src.replace(`.${extension}`, `.webp`);
    }
    
    // If you have a server-side image optimization service, construct URL here
    optimizedSrc = `/image-optimizer?src=${src}&width=${width}&quality=${quality}&format=${format}`;
    return optimizedSrc;
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

  // Optimize image loading with srcset
  optimizeImageLoading(img) {
    const src = img.getAttribute('data-src') || img.src;
    if (!src) return;

    // Generate srcset for responsive images
    const srcset = [];
    const widths = [320, 640, 768, 1024, 1366, 1920];
    
    widths.forEach(width => {
      const optimizedUrl = this.getResponsiveImageUrl(src, width);
      srcset.push(`${optimizedUrl} ${width}w`);
    });

    if (srcset.length > 0) {
      img.setAttribute('srcset', srcset.join(', '));
      img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw');
    }
  }

  // Compress images using canvas (client-side fallback)
  compressImage(img, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedUrl = URL.createObjectURL(blob);
          resolve(compressedUrl);
        } else {
          reject(new Error('Compression failed'));
        }
      }, 'image/jpeg', quality);
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


// Enhaced lazy loading with optimization
//inspired by cluadeAi
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
          // Optimize image loading
          imageOptimizer.optimizeImageLoading(img);
          
          // Create a new image to preload
          const tempImg = new Image();
          
          tempImg.onload = function() {
            // Check if image is too large and needs compression
            if (tempImg.naturalWidth > 2000 || tempImg.naturalHeight > 2000) {
              console.log('Large image detected, applying optimization:', src);
            }
            
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
    // Start loading 50px before entering viewport
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
    /* Hide loading spinner */
    if (loadingSpinner) {
      loadingSpinner.style.display = 'none';
    }
  }

  // Add loading state to images
  lazyImages.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.remove('loading');
      this.classList.add('loaded');
      
      // Log image performance
      console.log('Image loaded:', {
        src: this.src,
        naturalWidth: this.naturalWidth,
        naturalHeight: this.naturalHeight,
        fileSize: 'N/A (use Network tab to check)'
      });
    });
    
    img.addEventListener('error', function() {
      this.classList.remove('loading');
      this.classList.add('error');
      console.error('Failed to load image:', this.alt || this.src);
      
      // Set fallback image if available
      const fallback = this.getAttribute('data-fallback');
      if (fallback) {
        this.src = fallback;
      }
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

// PROGRESSIVE IMAGE LOADING PUTS BLUR-UP EFFECT

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

// Initialize progressive image loader
document.addEventListener('DOMContentLoaded', function() {
  new ProgressiveImageLoader();
});

// IMAGE PERFORMANCE MONITORING

class ImagePerformanceMonitor {
  constructor() {
    this.metrics = {
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      totalLoadTime: 0,
      largestImage: { size: 0, src: '' }
    };
    this.init();
  }

  init() {
    // Monitor all images on the page
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.initiatorType === 'img') {
            this.metrics.totalImages++;
            this.metrics.totalLoadTime += entry.duration;
            
            // Track largest image
            if (entry.encodedBodySize > this.metrics.largestImage.size) {
              this.metrics.largestImage = {
                size: entry.encodedBodySize,
                src: entry.name
              };
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  getReport() {
    const avgLoadTime = this.metrics.totalImages > 0 
      ? (this.metrics.totalLoadTime / this.metrics.totalImages).toFixed(2) 
      : 0;
    
    return {
      ...this.metrics,
      averageLoadTime: avgLoadTime + 'ms',
      largestImageSize: (this.metrics.largestImage.size / 1024).toFixed(2) + 'KB'
    };
  }
}

// Initialize performance monitor
const imagePerformanceMonitor = new ImagePerformanceMonitor();

// Log performance report after page load
window.addEventListener('load', function() {
  setTimeout(() => {
    const report = imagePerformanceMonitor.getReport();
    console.log('Image Performance Report:', report);
    
    // Show warning if images are too large
    if (report.largestImage.size > 500000) { // 500KB
      console.warn('Large image detected:', report.largestImage.src, '- Consider optimization');
    }
  }, 2000);
});