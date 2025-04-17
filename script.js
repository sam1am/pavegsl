// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            mobileMenu.classList.add('hidden');

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .slide-up, .slide-up-delayed');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Make header elements visible immediately
    document.querySelectorAll('header .slide-up, header .slide-up-delayed').forEach(el => {
        setTimeout(() => {
            el.classList.add('appear');
        }, 300);
    });

    // Counter animation
    const counterElements = document.querySelectorAll('.counter-up');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.counter');
                const target = parseInt(entry.target.dataset.target);
                let count = 0;
                const duration = 2000; // 2 seconds
                const interval = Math.floor(duration / target);

                const counterAnimation = setInterval(() => {
                    count += Math.ceil(target / (duration / 50));
                    if (count >= target) {
                        counter.textContent = target;
                        clearInterval(counterAnimation);
                    } else {
                        counter.textContent = count;
                    }
                }, 50);

                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counterElements.forEach(element => {
        counterObserver.observe(element);
    });
});

// Easter egg - console message
console.log("%cThis is a satirical website. Please support actual conservation efforts for the Great Salt Lake.", "font-size: 14px;");