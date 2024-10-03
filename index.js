

// Toggle Navigation
function toggleNav() {
    const overlay = document.getElementById('navOverlay');
    overlay.style.width = overlay.style.width === '100%' ? '0' : '100%';
}

// Quote Form Toggle
function openForm() {
    document.getElementById('quoteForm').style.display = 'flex';
    loadCalendly(); 
}

function closeForm() {
    document.getElementById('quoteForm').style.display = 'none';
}

// Load Calendly Widget
function loadCalendly() {
    const calendlyDiv = document.getElementById('calendly-widget');
    calendlyDiv.innerHTML = `
        <iframe 
            src="https://calendly.com/redpocket_studio/30min" 
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

  // Client Count Animation
  let clientCount = 0; // Starting point
  const targetCount = 1.5; // Target count in thousands
  const countElement = document.getElementById('clientCount');
  let hasCounted = false; // Flag to check if counting has already started
  
  // Function to update the client count
  const updateCount = () => {
      const interval = setInterval(() => {
          if (clientCount < targetCount) {
              clientCount += 0.05; // Increment by 0.01k
              countElement.textContent = clientCount.toFixed(1) + 'k Weddings'; // Update the text
          } else {
              clearInterval(interval); // Stop once the target is reached
          }
      }, 20);
  };
  
  // Intersection Observer to trigger counting when the client reviews section is visible
  const clientReviewsSection = document.querySelector('.client-reviews');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting && !hasCounted) {
              updateCount(); // Start counting
              hasCounted = true; // Set the flag to true to prevent multiple counts
          }
      });
  }, { threshold: 0.5 }); 
  
  observer.observe(clientReviewsSection); 
  

// Fade in About Us section on scroll
const aboutSection = document.getElementById('aboutUs');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('fade-in');
        }
    });
}, { threshold: 0.5 }); 

aboutObserver.observe(aboutSection);

// Fade in Story Section on scroll
const storySection = document.querySelector('.text-container');

const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            storySection.classList.add('fade-in-story', 'visible');
        } else {
            storySection.classList.remove('visible'); 
        }
    });
}, { threshold: 0.5 }); 

storyObserver.observe(storySection);
