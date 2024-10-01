// Menu Toggle for Navigation
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

// Navigation links
const navLinks = [
    { name: 'Home', link: '#home' },
    { name: 'About Us', link: '#aboutUs' },
    { name: 'Packages', link: '#packages' },
    { name: 'Our Work', link: '#ourWork' },
    { name: 'Wireframes', link: '#wireframes' }
];

// Dynamically create navigation list
function createNavList() {
    navLinks.forEach(item => {
        const navItem = document.createElement('a');
        navItem.href = item.link;
        navItem.textContent = item.name;
        navItem.className = 'nav-link'; // Adding class for hover effects
        navList.appendChild(navItem);
    });
}

// Toggle navigation visibility
// Correct the toggle class functionality for navigation
menuToggle.addEventListener('click', () => {
    if (navList.style.display === 'none' || navList.style.display === '') {
        navList.style.display = 'flex';  // Show the nav list
    } else {
        navList.style.display = 'none';  // Hide the nav list
    }
});


// Call function to create the nav list
createNavList();

let currentReview = 0;
const reviews = [
    "Great experience! Loved the video.",
    "Highly recommended for photography and videography!",
    "The best wedding studio!",
    "Amazing service and beautiful photos!"
];

const reviewText = document.getElementById('reviewText');

// Function to update reviews
function updateReview() {
    reviewText.textContent = reviews[currentReview];
    currentReview = (currentReview + 1) % reviews.length; // Loop through reviews
}

// Auto show reviews every 3 seconds
setInterval(updateReview, 3000);
updateReview(); // Show the first review immediately

