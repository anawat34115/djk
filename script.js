// DJK Medical Equipment - Interactive JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeScrollProgress();
    initializeMobileMenu();
});

// Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header shadow and background
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(15, 30, 58, 0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(15, 30, 58, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.about-item, .value-item, .product-item, .category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth Scroll for Navigation Links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    // Add click tracking for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .contact-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track button click (you can integrate with analytics here)
            const buttonText = this.textContent.trim();
            console.log('CTA Button Clicked:', buttonText);
            
            // Add ripple effect
            createRippleEffect(e, this);
        });
    });
}

// Ripple Effect for Buttons
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Mobile Menu (if needed for future expansion)
function initializeMobileMenu() {
    // Placeholder for mobile menu functionality
    // Can be expanded if hamburger menu is added
}

// Product Category Filter (for future enhancement)
function initializeProductFilter() {
    // Placeholder for product filtering functionality
    // Can be expanded to add search/filter capabilities
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Form Validation (for future contact form)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('กรุณาระบุชื่อของคุณ');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('กรุณาระบุอีเมลที่ถูกต้อง');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('กรุณาระบุข้อความอย่างน้อย 10 ตัวอักษร');
    }
    
    return errors;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics Tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    // Can be integrated with Google Analytics, Facebook Pixel, etc.
    console.log('Event Tracked:', eventName, properties);
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime + 'ms');
        
        // Track performance metrics
        if ('performance' in window && 'getEntriesByType' in performance) {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const entry = perfEntries[0];
                console.log('DNS Lookup Time:', entry.domainLookupEnd - entry.domainLookupStart + 'ms');
                console.log('Server Response Time:', entry.responseEnd - entry.requestStart + 'ms');
            }
        }
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Can be integrated with error tracking services
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializePerformanceMonitoring();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// CSS for ripple effect (added dynamically)
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        overflow-x: hidden;
    }
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
