// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links li');
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch('https://formspree.io/f/xovwegrp', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.style.color = '#10B981';
                contactForm.reset();
            } else {
                formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                formMessage.style.color = '#e11d48';
            }
        })
        .catch(() => {
            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
            formMessage.style.color = '#e11d48';
        });
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}s`;
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .timeline-item, .skills-category, .skill-item, .about-content, .hero-content, .contact-form').forEach((element, index) => {
    if (element.classList.contains('timeline-item')) {
        element.dataset.delay = index * 0.2;
    }
    observer.observe(element);
});

// Add scroll-triggered animations to sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in-section');
});

// Add animation classes to elements
document.querySelectorAll('.hero h1, .hero .subtitle, .hero .description').forEach((element, index) => {
    element.classList.add('fade-in-up');
    element.style.animationDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.cta-buttons .btn').forEach((element, index) => {
    element.classList.add('fade-in-up');
    element.style.animationDelay = `${0.6 + index * 0.2}s`;
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
}); 