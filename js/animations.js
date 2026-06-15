// Advanced Animations for Varieta Auto Peças

// ======================
// Parallax Scroll Effect
// ======================
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrollPosition = window.scrollY;

        this.elements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
}

// Initialize parallax on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParallaxEffect();
    });
} else {
    new ParallaxEffect();
}

// ======================
// Counter Animation
// ======================
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.current = 0;
        this.hasAnimated = false;
    }

    start() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        const increment = this.target / (this.duration / 16);
        const timer = setInterval(() => {
            this.current += increment;
            if (this.current >= this.target) {
                this.current = this.target;
                clearInterval(timer);
            }
            this.element.textContent = Math.floor(this.current);
        }, 16);
    }
}

// Observe counters
const counterElements = document.querySelectorAll('[data-counter]');
if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = new CounterAnimation(
                    entry.target,
                    entry.target.dataset.counter,
                    entry.target.dataset.duration || 2000
                );
                counter.start();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counterElements.forEach(element => counterObserver.observe(element));
}

// ======================
// Text Animation (Typing Effect)
// ======================
class TypingEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Optional: Initialize typing effect on hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Uncomment to enable typing effect
    // const typing = new TypingEffect(heroTitle, heroTitle.textContent, 50);
    // const typingObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             typing.start();
    //             typingObserver.unobserve(entry.target);
    //         }
    //     });
    // });
    // typingObserver.observe(heroTitle);
}

// ======================
// Scroll Reveal Animation
// ======================
class ScrollReveal {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.elements = document.querySelectorAll(selector);
        this.options = {
            delay: options.delay || 0,
            distance: options.distance || 50,
            duration: options.duration || 600,
            easing: options.easing || 'ease-out',
            origin: options.origin || 'bottom',
            ...options
        };
        this.init();
    }

    init() {
        this.elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transition = `all ${this.options.duration}ms ${this.options.easing}`;
            
            const delay = this.options.delay + (index * 100);
            element.style.transitionDelay = `${delay}ms`;

            // Set initial transform based on origin
            const distance = this.options.distance;
            switch (this.options.origin) {
                case 'top':
                    element.style.transform = `translateY(-${distance}px)`;
                    break;
                case 'bottom':
                    element.style.transform = `translateY(${distance}px)`;
                    break;
                case 'left':
                    element.style.transform = `translateX(-${distance}px)`;
                    break;
                case 'right':
                    element.style.transform = `translateX(${distance}px)`;
                    break;
            }
        });

        this.observe();
    }

    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(element => observer.observe(element));
    }
}

// Initialize scroll reveals
new ScrollReveal('.product-card', { origin: 'bottom', delay: 100 });
new ScrollReveal('.differential-card', { origin: 'bottom', delay: 50 });
new ScrollReveal('.testimonial-card', { origin: 'bottom', delay: 50 });

// ======================
// Hover Animation for Cards
// ======================
class CardHoverEffect {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.onMouseEnter(card));
            card.addEventListener('mouseleave', () => this.onMouseLeave(card));
        });
    }

    onMouseEnter(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    }

    onMouseLeave(card) {
        card.style.transform = 'translateY(0) scale(1)';
    }
}

new CardHoverEffect('.product-card');
new CardHoverEffect('.differential-card');
new CardHoverEffect('.testimonial-card');

// ======================
// Scroll to Top Button
// ======================
class ScrollToTopButton {
    constructor() {
        this.button = this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.id = 'scroll-to-top';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--accent-blue);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            font-size: 24px;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        `;
        
        button.addEventListener('click', () => this.scrollToTop());
        document.body.appendChild(button);
        
        return button;
    }

    init() {
        window.addEventListener('scroll', () => this.toggleButton());
    }

    toggleButton() {
        if (window.scrollY > 300) {
            this.button.style.display = 'flex';
            this.button.style.opacity = '1';
        } else {
            this.button.style.opacity = '0';
            setTimeout(() => {
                this.button.style.display = 'none';
            }, 300);
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollToTopButton();
    });
} else {
    new ScrollToTopButton();
}

// ======================
// Blur Animation on Scroll
// ======================
class BlurScrollEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
            
            if (scrollPercentage > 0 && scrollPercentage < 1) {
                const blur = Math.max(0, 10 * (1 - scrollPercentage));
                element.style.filter = `blur(${blur}px)`;
            }
        });
    }
}

// Optional: Apply blur effect to hero image
// new BlurScrollEffect('.hero-image');

// ======================
// Performance Optimization
// ======================
// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('Animation library loaded successfully');