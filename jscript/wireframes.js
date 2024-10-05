document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-item');
    const readMoreButtons = document.querySelectorAll('.read-more');

    
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 300);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuClose = document.querySelector('.menu-close');

    menuToggle.addEventListener('click', () => {
        menuOverlay.style.display = 'flex';
    });

    menuClose.addEventListener('click', () => {
        menuOverlay.style.display = 'none';
    });

   // Read more button functionality
   readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const section = button.closest('.content-item');
        const contentDetails = section.querySelector('.content-details');
        const isVisible = contentDetails.classList.toggle('visible');
        button.textContent = isVisible ? 'Close' : 'Read More';
    });
});
});