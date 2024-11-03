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
    { text: 'Essays', href: 'essays.html' },
    {text: 'Feedback form', href: 'feedback.html' }
];

// Populate the overlay with navigation links
const overlayContent = document.querySelector('.overlay-content');

navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    overlayContent.appendChild(a);
});



// Grabbing form elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Validation functions
function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    error.style.display = 'block';
    input.classList.add('invalid');
}

function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = '';
    error.style.display = 'none';
    input.classList.remove('invalid');
}

function validateName() {
    const name = nameInput.value.trim();
    if (!name.match(/^[A-Za-z\s]+$/)) {
        showError(nameInput, 'Name must only contain letters and spaces.');
        return false;
    }
    clearError(nameInput);
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Enter a valid email.');
        return false;
    }
    clearError(emailInput);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        showError(passwordInput, 'Password must be at least 6 characters, include a number, and a special character.');
        return false;
    }
    clearError(passwordInput);
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        showError(phoneInput, 'Phone number must be 10 digits.');
        return false;
    }
    clearError(phoneInput);
    return true;
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message.length < 10) {
        showError(messageInput, 'Message must be at least 10 characters.');
        return false;
    }
    if (message.length > 200) {
        showError(messageInput, 'Message cannot exceed 200 characters.');
        return false;
    }
    clearError(messageInput);
    return true;
}

// Form submission event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isPasswordValid && isPhoneValid && isMessageValid) {
        successMessage.classList.remove('hidden');
        successMessage.textContent = 'Thank you! Your message has been successfully submitted.';
        form.reset();
    }
});


// Call the function to create the footer after the DOM has loaded
document.addEventListener('DOMContentLoaded', createFooter);