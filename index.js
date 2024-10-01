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
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
});

// Call function to create the nav list
createNavList();

// Sample reviews for client reviews section
const reviews = [
    "Great experience! Loved the video.",
    "Highly recommended for photography and videography!",
    "The best wedding studio!",
    "Amazing service and beautiful photos!"
];

let currentReview = 0;
const reviewText = document.getElementById('reviewText');
const reviewText2 = document.getElementById('reviewText2');

// Sliding reviews from left to right
function showReview() {
    reviewText.textContent = reviews[currentReview];
    reviewText2.textContent = reviews[(currentReview + 1) % reviews.length];
    currentReview = (currentReview + 1) % reviews.length;
}

// Auto show reviews every 3 seconds
setInterval(showReview, 3000);
showReview(); // Show the first review immediately
