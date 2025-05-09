// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Contact Form Popup
const contactPopup = document.getElementById('contactPopup');
const contactTriggerBtn = document.querySelector('.contact-trigger-btn');
const closePopupBtn = document.querySelector('.close-popup');

function openPopup() {
    contactPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    setTimeout(() => {
        contactPopup.querySelector('.popup-content').style.opacity = '1';
        contactPopup.querySelector('.popup-content').style.transform = 'scale(1)';
    }, 10);
}

function closePopup() {
    contactPopup.querySelector('.popup-content').style.opacity = '0';
    contactPopup.querySelector('.popup-content').style.transform = 'scale(0.7)';
    setTimeout(() => {
        contactPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }, 300);
}

contactTriggerBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

// Close popup when clicking outside
contactPopup.addEventListener('click', (e) => {
    if (e.target === contactPopup) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
        closePopup();
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    
    // Example: Show success message and close popup
    alert('Message sent successfully!');
    closePopup();
    contactForm.reset();
});

// Add scroll animation for stats with improved animation
const stats = document.querySelectorAll('.stat-item h3');
let animated = false;

function animateValue(start, end, duration, element) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function animateStats() {
    if (animated) return;

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateValue(0, target, 2000, stat); // 2000ms = 2 seconds duration
    });
    
    animated = true;
}

// Create Intersection Observer with options
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Reset animation when scrolling back to top
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        animated = false;
    }
});

// Add scroll-based navbar background
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Section reveal animations
const revealSections = document.querySelectorAll('.about, .programs, .contact');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // Stop observing after animation
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '-50px'
});

revealSections.forEach(section => {
    revealObserver.observe(section);
}); 