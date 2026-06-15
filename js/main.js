// Main JavaScript for Varieta Auto Peças Landing Page

// ======================
// Navbar Scrolling Effect
// ======================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

// Handle navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = navMenu.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ======================
// Scroll Indicator
// ======================
const scrollIndicator = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// ======================
// Intersection Observer for Animations
// ======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.observe-fade-up').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.product-card').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.differential-card').forEach(el => {
    observer.observe(el);
});

// ======================
// Contact Form
// ======================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            vehicle: document.getElementById('vehicle').value,
            message: document.getElementById('message').value
        };
        
        // Create WhatsApp message
        const whatsappMessage = `Olá! Meu nome é ${formData.name}. Telefone: ${formData.phone}. Veículo: ${formData.vehicle}. Mensagem: ${formData.message}`;
        const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappLink, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message (optional)
        showNotification('Mensagem enviada! Você será redirecionado para o WhatsApp.');
    });
}

// ======================
// Notification System
// ======================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slide-in-right 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slide-in-left 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======================
// Smooth Scroll Polyfill
// ======================
if (!CSS.supports('scroll-behavior: smooth')) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// ======================
// Performance Monitoring
// ======================
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ======================
// Accessibility Improvements
// ======================
// Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#inicio';
skipLink.className = 'skip-to-main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 9999;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ======================
// Analytics Event Tracking
// ======================
function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent.trim(),
            button_class: btn.className
        });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
            trackEvent('section_view', {
                section_id: entry.target.id
            });
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ======================
// Lazy Loading Images (Fallback)
// ======================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ======================
// Dark Mode Toggle (Optional)
// ======================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark && !localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
});