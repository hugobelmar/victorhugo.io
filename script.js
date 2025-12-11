/* ===== MOBILE MENU ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = ''; // Restore scroll
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = '';
}));

/* ===== CHANGE BACKGROUND HEADER ===== */
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if (this.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/* ===== SHOW SCROLL UP ===== */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);

/* ===== ACTIVE LINK HIGHLIGHTING ===== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* ===== SMOOTH SCROLLING FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== ANIMATIONS ON SCROLL ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special animations for specific elements
            if (entry.target.classList.contains('language__item')) {
                const progressBar = entry.target.querySelector('.language__progress');
                if (progressBar) {
                    const level = progressBar.getAttribute('data-level');
                    progressBar.style.setProperty('--progress-width', level + '%');
                    progressBar.classList.add('animate');
                }
            }
            
            if (entry.target.classList.contains('skill__item')) {
                // Add staggered delay for skill items
                const skillItems = document.querySelectorAll('.skill__item');
                const index = Array.from(skillItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(`
    .profile__content,
    .education__item,
    .skill__item,
    .experience__content,
    .contact__item,
    .language__item
`);

animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

/* ===== TYPEWRITER EFFECT FOR HERO TITLE ===== */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

/* ===== PROGRESS BAR ANIMATION ===== */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.language__progress');
    
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.setProperty('--progress-width', level + '%');
                        bar.classList.add('animate');
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(bar);
    });
}

// Initialize progress bar animations
animateProgressBars();

/* ===== SKILL CARDS HOVER EFFECTS ===== */
const skillItems = document.querySelectorAll('.skill__item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ===== EXPERIENCE ITEMS INTERACTION ===== */
const experienceItems = document.querySelectorAll('.experience__list-item');

experienceItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add a subtle click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateX(4px)';
        }, 100);
    });
});

/* ===== NAVIGATION ACTIVE STATE ===== */
const navLinksAll = document.querySelectorAll('.nav__link');

// Add click event to all nav links
navLinksAll.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        navLinksAll.forEach(l => l.classList.remove('active-link'));
        // Add active class to clicked link
        this.classList.add('active-link');
    });
});

/* ===== CONTACT FORM INTERACTION (if added later) ===== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form submission animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '¡Enviado!';
                submitBtn.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }
}

// Initialize contact form if it exists
initContactForm();

/* ===== SCROLL TO TOP BUTTON ===== */
const scrollUpBtn = document.getElementById('scroll-up');

if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== PARALLAX EFFECT FOR HERO SECTION ===== */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
initParallax();

/* ===== LOADING ANIMATION ===== */
function initLoadingAnimation() {
    const loader = document.querySelector('.loader');
    
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }
}

initLoadingAnimation();

/* ===== DARK MODE TOGGLE (if implemented) ===== */
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    if (darkModeToggle) {
        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme
        if (currentTheme === 'dark') {
            body.classList.add('dark-theme');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Initialize dark mode if toggle exists
initDarkMode();

/* ===== SKILL LEVEL INDICATORS ===== */
function createSkillIndicators() {
    const skillItems = document.querySelectorAll('.skill__item');
    
    skillItems.forEach(item => {
        const levelElement = item.querySelector('.skill__level');
        if (levelElement) {
            const level = levelElement.textContent.toLowerCase();
            
            // Add visual indicator based on skill level
            let indicatorColor = '';
            let indicatorIcon = '';
            
            switch(level) {
                case 'básico':
                case 'en desarrollo':
                    indicatorColor = 'var(--warning-color)';
                    indicatorIcon = '🟡';
                    break;
                case 'intermedio':
                    indicatorColor = 'var(--primary-color)';
                    indicatorIcon = '🔵';
                    break;
                case 'avanzado':
                case 'experto':
                    indicatorColor = 'var(--success-color)';
                    indicatorIcon = '🟢';
                    break;
                default:
                    indicatorColor = 'var(--text-secondary)';
                    indicatorIcon = '⚪';
            }
            
            // Add indicator
            const indicator = document.createElement('span');
            indicator.textContent = indicatorIcon;
            indicator.style.marginLeft = '8px';
            indicator.style.fontSize = '12px';
            
            levelElement.appendChild(indicator);
        }
    });
}

// Initialize skill indicators
createSkillIndicators();

/* ===== KEYBOARD NAVIGATION ===== */
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    }
    
    // Arrow keys for navigation (when not in input fields)
    if (!e.target.matches('input, textarea, select')) {
        const sectionsArray = Array.from(sections);
        const currentSection = sectionsArray.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (currentSection) {
            const currentIndex = sectionsArray.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sectionsArray.length - 1) {
                e.preventDefault();
                const nextSection = sectionsArray[currentIndex + 1];
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: nextSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
            
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                const prevSection = sectionsArray[currentIndex - 1];
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: prevSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }
});

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */
function initAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels where needed
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    const navClose = document.getElementById('nav-close');
    if (navClose) {
        navClose.setAttribute('aria-label', 'Cerrar menú de navegación');
    }
}

// Initialize accessibility features
initAccessibility();

/* ===== PRINT OPTIMIZATION ===== */
function initPrintOptimization() {
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections for printing
        const collapsedElements = document.querySelectorAll('.collapsed');
        collapsedElements.forEach(el => {
            el.classList.remove('collapsed');
        });
    });
}

// Initialize print optimization
initPrintOptimization();

/* ===== PERFORMANCE OPTIMIZATION ===== */
function initPerformanceOptimization() {
    // Lazy load images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
    
    // Debounce scroll events for better performance
    let scrollTimeout;
    const originalScrollHandler = scrollActive;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            scrollActive();
            scrollHeader();
            scrollUp();
        }, 10);
    });
}

// Initialize performance optimizations
initPerformanceOptimization();

/* ===== ERROR HANDLING ===== */
window.addEventListener('error', function(e) {
    console.warn('Error caught:', e.error);
    // You could send error reports to a logging service here
});

/* ===== CONSOLE WELCOME MESSAGE ===== */
console.log(`
🌟 ¡Bienvenido a mi CV Web! 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Esta página fue desarrollada exclusivamente para 
presentar mi currículum vitae profesional.

Tecnologías utilizadas:
• HTML5 Semántico
• CSS3 con Variables CSS y Flexbox/Grid
• JavaScript ES6+ con APIs modernas
• Diseño Responsivo (Mobile-First)
• Animaciones CSS y JavaScript
• Optimización de Accesibilidad

¿Interesado en el código? ¡Contáctame!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

/* ===== INITIALIZATION COMPLETE ===== */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 CV Web inicializado correctamente');
    
    // Add a small delay to ensure all animations are smooth
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Export functions for potential external use
window.CVWeb = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: section.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    },
    
    toggleMobileMenu: function() {
        navMenu.classList.toggle('show-menu');
    },
    
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};