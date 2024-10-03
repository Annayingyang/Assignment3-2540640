// Toggle Navigation
function toggleNav() {
    const overlay = document.getElementById('navOverlay');
    overlay.style.width = overlay.style.width === '100%' ? '0' : '100%';
}

// Quote Form Toggle
function openForm() {
    document.getElementById('quoteForm').style.display = 'flex';
    loadCalendly(); // Load Calendly widget when the form is opened
}

function closeForm() {
    document.getElementById('quoteForm').style.display = 'none';
}

// Load Calendly Widget
function loadCalendly() {
    const calendlyDiv = document.getElementById('calendly-widget');
    calendlyDiv.innerHTML = `
        <iframe 
            src="https://calendly.com/annaying-yang07/30min" 
            width="100%" 
            height="600px" 
            frameborder="0" 
            scrolling="no">
        </iframe>`;
}

  
  // Client Reviews
  const reviews = [
    {
      name: "John Doe",
      review: "Red Pocket Studio was amazing. They captured every moment beautifully!"
    },
    {
      name: "Jane Smith",
      review: "Fantastic service, highly recommend for any wedding!"
    },
    {
      name: "Chris Evans",
      review: "Professional and creative, loved working with them!"
    }
  ];
  
  let currentReview = 0;
  
  // Display Reviews
  function showReview() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = `<h3>${reviews[currentReview].name}</h3><p>${reviews[currentReview].review}</p>`;
    currentReview = (currentReview + 1) % reviews.length;
  }
  
  // Update review every 5 seconds
  setInterval(showReview, 5000);
  
  // using with first review
  showReview();

// Fade in About Us section on scroll
const aboutSection = document.getElementById('aboutUs');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('fade-in');
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

observer.observe(aboutSection);