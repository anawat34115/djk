// DJK Medical - Design Showcase JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeShowcaseFeatures();
    initializeAnimations();
    initializeInteractions();
});

// Showcase Features Initialization
function initializeShowcaseFeatures() {
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.showcase-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.design-card, .recommendation-card, .table-row');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Interactions
function initializeInteractions() {
    // Design card hover effects
    const designCards = document.querySelectorAll('.design-card');
    designCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Preview button clicks
    const previewButtons = document.querySelectorAll('.btn-preview');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            this.innerHTML = '<span>⏳</span><span>กำลังโหลด...</span>';
            this.style.opacity = '0.7';
            
            // Simulate loading (in real scenario, this would navigate immediately)
            setTimeout(() => {
                this.innerHTML = this.getAttribute('data-original-text') || '<span>👁️</span><span>ดูตัวอย่าง</span>';
                this.style.opacity = '1';
            }, 500);
        });
    });

    // Table row hover effects
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(15, 30, 58, 0.05)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
}

// Parallax effect for hero section
function initializeParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Initialize parallax on load
window.addEventListener('load', () => {
    initializeParallax();
    document.body.classList.add('loaded');
});

// Loading animation
window.addEventListener('load', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate badge
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            heroBadge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'scale(1)';
        }, 300);
    }
});

// Counter animation for stats (if any)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Add loading styles dynamically
const loadingStyles = `
    body.loaded {
        overflow-x: hidden;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .design-card {
        transition: all 0.3s ease;
    }
    
    .table-row {
        transition: background 0.3s ease;
    }
    
    .btn-preview {
        transition: all 0.3s ease;
    }
    
    .recommendation-card {
        transition: all 0.3s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Performance optimization
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can be added here
}, 10));

// Track design views (for analytics)
function trackDesignView(designType) {
    // This would integrate with analytics in production
    console.log(`Design viewed: ${designType}`);
    
    // Example: Google Analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'design_view', {
            'design_type': designType
        });
    }
}

// Add click tracking to preview buttons
document.addEventListener('DOMContentLoaded', function() {
    const previewButtons = document.querySelectorAll('.btn-preview');
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.design-card');
            const designType = card.classList.contains('original-design') ? 'original' :
                           card.classList.contains('modern-design') ? 'modern' : 'corporate';
            trackDesignView(designType);
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press '1', '2', '3' to navigate to designs
    if (e.key === '1') {
        window.open('index.html', '_blank');
    } else if (e.key === '2') {
        window.open('design1-modern.html', '_blank');
    } else if (e.key === '3') {
        window.open('design2-corporate.html', '_blank');
    }
});

// Add print styles
const printStyles = `
    @media print {
        .showcase-header,
        .cta-section {
            display: none;
        }
        
        .design-card {
            break-inside: avoid;
            page-break-inside: avoid;
        }
        
        .options-grid {
            grid-template-columns: 1fr;
        }
    }
`;

const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printStyles;
document.head.appendChild(printStyleSheet);
