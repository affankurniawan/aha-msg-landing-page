document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 40; // 40px offset
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- The AHA Curve SVG Animation Trigger ---
    const ahaCurvePath = document.querySelector('.path-aha');
    const curveSection = document.querySelector('.chart-container');
    
    if (ahaCurvePath && curveSection) {
        const curveObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ahaCurvePath.classList.add('animate');
                }
            });
        }, { threshold: 0.5 });
        
        curveObserver.observe(curveSection);
    }

    // --- Sticky Footer Visibility ---
    // Show sticky footer only after scrolling past the hero section
    const stickyFooter = document.querySelector('.sticky-footer');
    const heroSection = document.querySelector('.hero');
    
    if (stickyFooter && heroSection) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If hero is NOT intersecting (meaning we scrolled past it)
                if (!entry.isIntersecting) {
                    stickyFooter.classList.add('visible');
                } else {
                    stickyFooter.classList.remove('visible');
                }
            });
        }, { 
            root: null,
            threshold: 0,
            rootMargin: "-100px 0px 0px 0px" // give a little buffer
        });
        
        footerObserver.observe(heroSection);
        // Fallback check on load in case loaded midway down page
        if (window.scrollY > window.innerHeight) {
             stickyFooter.classList.add('visible');
        }
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
