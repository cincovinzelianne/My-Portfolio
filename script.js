// Premium Portfolio - Enhanced Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSkillBars();
    initSmoothScrolling();
    initInteractivePattern();
    initSideNav();
    
    console.log('✨ Portfolio Loaded Successfully');
});

function initInteractivePattern() {
    const root = document.documentElement;
    const pattern = document.querySelector('.interactive-pattern');

    if (!pattern) {
        return;
    }

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;

    const updatePattern = () => {
        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;

        const xPercent = (currentX / window.innerWidth) * 100;
        const yPercent = (currentY / window.innerHeight) * 100;
        const shiftX = (xPercent - 50) * 0.42;
        const shiftY = (yPercent - 50) * 0.42;

        root.style.setProperty('--mouse-x', `${xPercent}%`);
        root.style.setProperty('--mouse-y', `${yPercent}%`);
        root.style.setProperty('--mouse-shift-x', `${shiftX}px`);
        root.style.setProperty('--mouse-shift-y', `${shiftY}px`);

        requestAnimationFrame(updatePattern);
    };

    window.addEventListener('mousemove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        if (touch) {
            targetX = touch.clientX;
            targetY = touch.clientY;
        }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        targetX = window.innerWidth * 0.5;
        targetY = window.innerHeight * 0.5;
    });

    requestAnimationFrame(updatePattern);
}

// Side navigation: active highlighting, smooth scroll, and mobile toggle
function initSideNav() {
    const navLinks = document.querySelectorAll('.side-nav-link');
    if (!navLinks.length) return;

    const sections = Array.from(navLinks).map(l => document.getElementById(l.dataset.target)).filter(Boolean);

    // Smooth click behaviour
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // If mobile nav is open, close it
            if (document.body.classList.contains('lock-nav')) {
                document.body.classList.remove('lock-nav');
                const overlay = document.getElementById('side-nav-overlay');
                if (overlay) overlay.hidden = true;
            }
        });
    });

    // IntersectionObserver to mark active section
    const obsOptions = { threshold: 0.35, rootMargin: '0px 0px -10% 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.target.id) return;
            const id = entry.target.id;
            const link = document.querySelector(`.side-nav-link[data-target="${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }, obsOptions);

    // Observe each section referenced by nav
    sections.forEach(sec => observer.observe(sec));

    // Mobile toggle
    const toggle = document.getElementById('side-nav-toggle');
    const overlay = document.getElementById('side-nav-overlay');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const open = document.body.classList.toggle('lock-nav');
            if (overlay) overlay.hidden = !open;
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            document.body.classList.remove('lock-nav');
            overlay.hidden = true;
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}

// Animate skill progress bars
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        const progressBar = card.querySelector('.skill-progress');
        const level = progressBar.getAttribute('data-level');
        
        // Add staggered animation delay
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, index * 200);
    });
}

function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        const progressBar = card.querySelector('.skill-progress');
        const level = progressBar.getAttribute('data-level');
        
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, index * 100);
    });
}

// Magnetic hover effect for interactive elements
function initMagneticHover() {
    const magneticElements = document.querySelectorAll('.cyber-button, .social-link, .contact-method, .project-card, .skill-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.05;
            const moveY = y * 0.05;
            
            element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate3d(0, 0, 0)';
        });
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    // Smooth scroll to projects section
    window.scrollToProjects = function() {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Handle scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                skillsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Dynamic particle system - Subtle
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    
    // Randomize particle positions and animations
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 5 + Math.random() * 3;
        const randomLeft = Math.random() * 100;
        
        particle.style.left = randomLeft + '%';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
    });
}

// Button functionality
window.downloadResume = function(event) {
    // Create a download link for the resume
    const link = document.createElement('a');
    // Use encodeURI to ensure spaces and special chars are safe
    link.href = encodeURI('My Resume.pdf'); // Points to My Resume.pdf in the same directory
    link.download = 'My Resume.pdf';
    
    // Add some visual feedback - fallback if event is not provided
    let button = null;
    if (event && event.target) {
        button = event.target.closest && event.target.closest('.cyber-button');
    }
    if (!button) {
        button = document.querySelector('.cyber-button.outline') || document.querySelector('.cyber-button');
    }

    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    showNotification('Resume downloading... 📄', 'success');
};

window.initiateCollaboration = function() {
    // Open Gmail with pre-composed message
    openGmailCompose();
};

window.openGmailCompose = function() {
    const email = 'cinco.vinzelianne@llcc.edu.ph';
    const subject = 'Collaboration & Project Inquiry';
    const body = 'Hi Vinze,\n\nI would love to discuss potential collaboration opportunities and learn more about your expertise in web development.\n\nLooking forward to connecting with you!\n\nBest regards';
    
    // Create Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    showNotification('Opening Gmail... 📧', 'info');
};

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--glass);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        padding: 1rem 1.5rem;
        color: var(--foreground);
        font-family: inherit;
        font-weight: 500;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderLeft = `4px solid var(--accent-success)`;
    } else if (type === 'info') {
        notification.style.borderLeft = `4px solid var(--accent-primary)`;
    }
    
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Enhanced scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.3;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Update scroll indicator visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && e.metaKey) {
        e.preventDefault();
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.metaKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Performance optimization - Reduce animations on low-end devices
if (window.navigator && window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--duration-slow', '0.2s');
    document.documentElement.style.setProperty('--duration-normal', '0.15s');
    document.documentElement.style.setProperty('--duration-fast', '0.1s');
}

// Console Easter Egg
console.log(`
🌟 Welcome to Vinze's Cyberpunk Portfolio! 🌟

     ╔══════════════════════════════╗
     ║    SYSTEM INITIALIZED        ║
     ║    STATUS: ONLINE            ║
     ║    MODE: FUTURISTIC          ║
     ║    DEVELOPER: VINZE CINCO    ║
     ╚══════════════════════════════╝

🚀 Built with pure HTML, CSS, and JavaScript
💫 Featuring cutting-edge animations and effects
🎮 Ready for the digital future!

Type 'vinze.stats()' for developer stats!
`);

// Console API for fun
window.vinze = {
    stats: () => {
        console.log(`
📊 DEVELOPER STATS:
├─ Skills Mastered: 6+
├─ Projects Completed: 3
├─ Coffee Consumed: ∞
├─ Lines of Code: 10,000+
└─ Passion Level: MAXIMUM
        `);
    },
    contact: () => {
        console.log('📧 Contact: vinze@example.com');
        console.log('🔗 LinkedIn: /in/vinzecinco');
        console.log('🐙 GitHub: @vinzecinco');
    },
    hack: () => {
        console.log('🔐 Nice try! But this system is quantum-encrypted! 😄');
    }
};