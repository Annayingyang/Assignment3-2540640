// Function to toggle the navigation overlay
function toggleNav() {
    const navOverlay = document.getElementById("navOverlay");
    if (navOverlay) {
        navOverlay.style.width = (navOverlay.style.width === "100%") ? "0" : "100%";
    }
}

// Create navigation links
const navLinks = [
    { text: 'Home', href: 'index.html' },
    { text: 'About Us', href: 'aboutus.html' },
    { text: 'Packages', href: 'package.html' },
    { text: 'Our Work', href: 'ourwork.html' },
    { text: 'Online Wedding Invitation', href: 'weddinginvite.html' },
    { text: 'Wireframes', href: 'wireframes.html' },
    { text: 'Essays', href: 'essays.html' }
];

// Populate the overlay with navigation links
const overlayContent = document.querySelector('.overlay-content');

navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    overlayContent.appendChild(a);
});

// Quote Form Toggle
function openForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.style.display = 'flex';
        loadCalendly(); 
    }
}

function closeForm() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.style.display = 'none';
    }
}

// Load Calendly Widget
function loadCalendly() {
    const calendlyDiv = document.getElementById('calendly-widget');
    if (calendlyDiv) {
        calendlyDiv.innerHTML = `
            <iframe 
                src="https://calendly.com/redpocket_studio/30min" 
                width="100%" 
                height="600px" 
                frameborder="0" 
                scrolling="no">
            </iframe>`;
    }
}

window.addEventListener('scroll', () => {
    document.body.classList.add('scrolled');
});


document.addEventListener('DOMContentLoaded', () => {
    const essayGrid = document.querySelector('.essay-grid'); // Your essay grid
    const readMoreButtons = document.querySelectorAll('.read-more');
    const essayCards = document.querySelectorAll('.essay-card');
    const dots = document.querySelectorAll('.dot');

    let currentEssayIndex = 0;

    // Function to show the essay content
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const essayContent = button.parentElement.querySelector('.essay-content');
            essayContent.style.display = 'block';
        });
    });

    // Function to close the essay content
    const closeButtons = document.querySelectorAll('.essay-content .close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const essayContent = button.parentElement;
            essayContent.style.display = 'none';
        });
    });

    // Function to update the display based on the current index
    function updateDisplay(index) {
        // Ensure the index is within bounds
        currentEssayIndex = Math.max(0, Math.min(index, essayCards.length - 1));
        
        // Scroll to the corresponding essay card
        const cardToScroll = essayCards[currentEssayIndex];
        cardToScroll.scrollIntoView({ behavior: 'smooth', inline: 'start' }); // Scroll smoothly to the card

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentEssayIndex); // Update active dot
        });
    }

    // Initial display
    updateDisplay(currentEssayIndex);

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateDisplay(index); // Update display based on dot index
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const openEssayButtons = document.querySelectorAll('.open-essay');
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const closePdfButton = document.querySelector('.close-pdf');
    
    // Open PDF in modal
    openEssayButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pdfSrc = button.getAttribute('data-pdf'); // Get PDF link from data attribute
            pdfViewer.src = pdfSrc;
            pdfModal.style.display = 'flex';
        });
    });

    // Close modal
    closePdfButton.addEventListener('click', () => {
        pdfModal.style.display = 'none';
        pdfViewer.src = ''; // Clear src to stop loading the PDF
    });
});


