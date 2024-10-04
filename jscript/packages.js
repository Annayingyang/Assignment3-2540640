// Function to toggle the navigation overlay
function toggleNav() {
    var navOverlay = document.getElementById("navOverlay");
    if (navOverlay.style.width === "100%") {
        navOverlay.style.width = "0";
    } else {
        navOverlay.style.width = "100%";
    }
}

function fadeInOnScroll() {
    const storySection = document.querySelector('.story-section');
    const packageSection = document.querySelector('.package-section'); // Add the package section

    const windowHeight = window.innerHeight;
    
    // Check if the story section is in the viewport
    const storySectionTop = storySection.getBoundingClientRect().top;
    if (storySectionTop < windowHeight - 100) {
        storySection.classList.add('fade-in');
    }

    // Check if the package section is in the viewport
    const packageSectionTop = packageSection.getBoundingClientRect().top;
    if (packageSectionTop < windowHeight - 100) {
        packageSection.classList.add('fade-in');
    }
}

// Add an event listener for scroll
window.addEventListener('scroll', fadeInOnScroll);

