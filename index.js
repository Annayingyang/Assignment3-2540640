// Dynamically inject navbar
const navbar = document.getElementById('navbar');

// Array of links
const navLinks = [
    { title: 'Home', url: '#' },
    { title: 'About Us', url: '#about' },
    { title: 'Our Work', url: '#work' },
    { title: 'Book a Call', url: '#contact', class: 'book-call' }
];

// Inject links dynamically
navLinks.forEach(link => {
    const navItem = document.createElement('a');
    navItem.href = link.url;
    navItem.textContent = link.title;
    if (link.class) {
        navItem.classList.add(link.class);
    }
    navbar.appendChild(navItem);
});
