// Function to toggle the navigation overlay
function toggleNav() {
    var navOverlay = document.getElementById("navOverlay");
    if (navOverlay.style.width === "100%") {
        navOverlay.style.width = "0";
    } else {
        navOverlay.style.width = "100%";
    }
}

// Function to detect when the story section is in the viewport
function fadeInOnScroll() {
    const storySection = document.querySelector('.story-section');
    const sectionPosition = storySection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2; // Trigger when it's 20% into the viewport

    if (sectionPosition < screenPosition) {
        storySection.classList.add('fade-in'); // Add fade-in class
    }
}

// Listen for scroll events
window.addEventListener('scroll', fadeInOnScroll);
