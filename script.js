// Initialize Lucide icons
lucide.createIcons();

// Test that JavaScript is loading
console.log('JavaScript file loaded successfully!');

// Navigation functionality
let isScrolled = false;
const navigation = document.getElementById('navigation');

// Handle scroll effect on navigation
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50 && !isScrolled) {
        navigation.classList.add('scrolled');
        isScrolled = true;
    } else if (scrollY <= 50 && isScrolled) {
        navigation.classList.remove('scrolled');
        isScrolled = false;
    }
});

// Smooth scroll to section
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenu.classList.toggle('active');
    
    // Toggle icon between menu and X
    if (mobileMenu.classList.contains('active')) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    
    // Re-initialize icons after change
    lucide.createIcons();
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenu.classList.remove('active');
    menuIcon.setAttribute('data-lucide', 'menu');
    
    // Re-initialize icons after change
    lucide.createIcons();
}

// Contact form handling
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message')
    };
    
    // Disable submit button to prevent double submissions
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    try {
        // Send data to API endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Show success message
            showNotification('Mensaje enviado', 'Gracias por tu interés. Te contactaré pronto.', 'success');
            
            // Reset form
            event.target.reset();
        } else {
            // Show error message
            showNotification('Error', result.error || 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showNotification('Error', 'No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

// Notification system
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h4 class="notification-title">${title}</h4>
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i data-lucide="x"></i>
        </button>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: var(--card);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 1rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success {
                border-left: 4px solid var(--accent);
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            
            .notification-error .notification-title {
                color: #ef4444;
            }
            
            .notification-content {
                flex: 1;
            }
            
            .notification-title {
                font-weight: 600;
                margin-bottom: 0.25rem;
                color: var(--foreground);
            }
            
            .notification-message {
                font-size: 0.875rem;
                color: var(--muted-foreground);
                margin: 0;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--muted-foreground);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: color 0.2s ease;
            }
            
            .notification-close:hover {
                color: var(--foreground);
            }
            
            .notification-close i {
                width: 1rem;
                height: 1rem;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Re-initialize icons
    lucide.createIcons();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Contact methods
function openWhatsApp() {
    const message = encodeURIComponent('Hola José David, me interesa tu trabajo');
    window.open(`https://wa.me/573147162957?text=${message}`, '_blank');
}

function openEmail() {
    const subject = encodeURIComponent('Consulta sobre servicios de desarrollo');
    const body = encodeURIComponent('Hola José David,\n\nMe interesa conocer más sobre tus servicios de desarrollo web.\n\nSaludos,');
    window.open(`mailto:josedavid@ejemplo.com?subject=${subject}&body=${body}`, '_blank');
}

function openLinkedIn() {
    window.open('https://linkedin.com/in/josedavidblanodn', '_blank');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Observe cards for hover effects
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .project-card, .contact-method-card');
    cards.forEach(card => observer.observe(card));
    
    // Add scroll event listener for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                scrollToSection(href);
            }
        });
    });
    
    // Add click event listeners for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect styles
    if (!document.getElementById('ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading styles
    if (!document.getElementById('loading-styles')) {
        const loadingStyles = document.createElement('style');
        loadingStyles.id = 'loading-styles';
        loadingStyles.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(loadingStyles);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Add focus styles for accessibility
if (!document.getElementById('focus-styles')) {
    const focusStyles = document.createElement('style');
    focusStyles.id = 'focus-styles';
    focusStyles.textContent = `
        .btn:focus,
        .nav-link:focus,
        .mobile-nav-link:focus,
        input:focus,
        textarea:focus {
            outline: 2px solid var(--ring);
            outline-offset: 2px;
        }
        
        .btn:focus-visible,
        .nav-link:focus-visible,
        .mobile-nav-link:focus-visible {
            outline: 2px solid var(--ring);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyles);
}

// Add smooth scrolling for all anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        scrollToSection(targetId);
    }
});

// Add error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    });
});

// Add performance optimization
let ticking = false;

function updateOnScroll() {
    // Throttle scroll events
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Add service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}


// Projects Carousel functionality
let currentSlide = 0;
let carouselInterval;
const totalSlides = 3; // 3 slides with 3 projects each

function initProjectsCarousel() {
    const carousel = document.getElementById('projectsCarousel');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    console.log('Initializing carousel...', { 
        carousel: !!carousel, 
        indicators: indicators.length, 
        prevBtn: !!prevBtn, 
        nextBtn: !!nextBtn 
    });
    
    if (!carousel) {
        console.log('Carousel element not found!');
        return;
    }
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -currentSlide * 33.333; // 33.333% per slide
        console.log('Going to slide:', slideIndex, 'translateX:', translateX);
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        goToSlide(currentSlide);
    }
    
    // Function to start auto-slide
    function startAutoSlide() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        carouselInterval = setInterval(nextSlide, 6000); // 6 seconds
    }
    
    // Function to stop auto-slide
    function stopAutoSlide() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 3000); // Restart after 3 seconds
        });
    });
    
    // Add click event listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 3000); // Restart after 3 seconds
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 3000); // Restart after 3 seconds
        });
    }
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.projects-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Pause auto-slide when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // Initialize first slide
    goToSlide(0);
    
    // Start auto-slide after a short delay
    setTimeout(startAutoSlide, 1000);
    
    console.log('Carousel initialized successfully! Total slides:', totalSlides);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing carousel...');
    // Wait for all elements to be ready
    setTimeout(() => {
        initProjectsCarousel();
    }, 200);
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.openWhatsApp = openWhatsApp;
window.openEmail = openEmail;
window.openLinkedIn = openLinkedIn;
window.closeNotification = closeNotification;
