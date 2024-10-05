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