document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Slider
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const cards = document.querySelectorAll('.testimonial-card');

    if (slider && cards.length > 0) {
        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;

        // Function to scroll to a specific card
        function scrollToCard(index) {
            const card = cards[index];
            slider.scrollTo({
                left: card.offsetLeft - slider.offsetLeft,
                behavior: 'smooth'
            });
            updateDots(index);
            currentIndex = index;
        }

        // Update active dot
        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            scrollToCard(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToCard(currentIndex);
        });

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToCard(index);
            });
        });

        // Handle scroll snap on mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swipe left
                    currentIndex = Math.min(currentIndex + 1, cards.length - 1);
                } else {
                    // Swipe right
                    currentIndex = Math.max(currentIndex - 1, 0);
                }
                scrollToCard(currentIndex);
            }
        });

        // Auto-scroll every 5 seconds
        let autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToCard(currentIndex);
        }, 5000);

        // Pause auto-scroll when user interacts
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                scrollToCard(currentIndex);
            }, 5000);
        });

        // Initial scroll position
        scrollToCard(0);
    }
}); 