// Function to toggle the navigation overlay
function toggleNav() {
    const navOverlay = document.getElementById("navOverlay");
    if (navOverlay) {
        navOverlay.style.width = (navOverlay.style.width === "100%") ? "0" : "100%";
    }
}

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

// Function to slant the invitation template
function slantTemplate() {
    const template = document.getElementById("invitationTemplate");
    let angle = 0;
    let direction = 1; // 1 for right, -1 for left

    setInterval(() => {
        if (angle >= 15 || angle <= -15) {
            direction *= -1; // Change direction
        }
        angle += direction; // Increment the angle
        template.style.transform = `rotateY(${angle}deg)`; // Apply rotation
    }, 60); // Adjust speed by changing the interval
}

// Call the function to start slanting effect
slantTemplate();

