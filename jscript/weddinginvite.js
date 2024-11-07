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
    {text: 'Essays' , href: 'essays.html'},
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
    }, 60); 
}

// Call the function to start slanting effect
slantTemplate();

document.addEventListener('DOMContentLoaded', () => {
    // Initial render of the happiness graph
    renderHappinessGraph();

    // Update graph on window resize
    window.addEventListener('resize', renderHappinessGraph);
});

function renderHappinessGraph() {
    // Data for the graph
    const data = [
        { type: 'Paper Invite', happiness: 0 },
        { type: 'Our Invites', happiness: 100 },
    ];

    // Set up SVG dimensions
    const svgWidth = Math.min(window.innerWidth * 0.9, 600); // 90% of the window width or 600px
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    // Remove any existing SVG before creating a new one
    d3.select("#happinessGraph").selectAll("*").remove();

    // Create SVG element with viewBox for responsiveness
    const svg = d3.select("#happinessGraph")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .attr("preserveAspectRatio", "xMidYMid meet"); //  aspect ratio

    // Set up scales
    const xScale = d3.scalePoint()
        .domain(data.map(d => d.type))
        .range([margin.left, svgWidth - margin.right])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.happiness)])
        .range([svgHeight - margin.bottom, margin.top]);

    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.type))
        .y(d => yScale(d.happiness));

    // Add the line path
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#fff") // White line color
        .attr("stroke-width", 3)
        .attr("d", line);

    // Create circles for data points
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.type))
        .attr("cy", d => yScale(d.happiness))
        .attr("r", 5) // Circle radius
        .attr("fill", "#fff"); // Circle color

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10)) 
        .selectAll("text")
        .attr("fill", "#fff"); 

    // Add y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(5)) // Show 5 ticks on y-axis
        .selectAll("text")
        .attr("fill", "#fff"); 

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 8)
        .attr("x", -svgHeight / 1.7)
        .attr("dy", "1em")
        .attr("fill", "#fff")
        .attr("font-family", "Italiana, serif")
        .attr("font-size", "20px")
        .text("Happiness");

    // Animate line drawing on scroll
    function animateLine() {
        svg.select("path").attr("stroke-dasharray", function () {
            const length = this.getTotalLength();
            return `${length} ${length}`;
        }).attr("stroke-dashoffset", function () {
            return this.getTotalLength();
        }).transition()
            .duration(2000) // Duration of the animation
            .ease(d3.easeCubicInOut)
            .attr("stroke-dashoffset", 0);
    }

    // Trigger animation when the section is scrolled into view
    window.addEventListener("scroll", () => {
        const graphSection = document.querySelector(".graph-section");
        const rect = graphSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            animateLine();
            window.removeEventListener("scroll", animateLine); 
        }
    });
}



//weather section

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '5724267900be42ab902234804240410';
    const weatherEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

    // Fetch weather data
    fetch(weatherEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const forecasts = data.forecast.forecastday;
            const dates = forecasts.map(forecast => new Date(forecast.date)); // Convert date string to Date
            const temperatures = forecasts.map(forecast => forecast.day.avgtemp_c); // Get average temperatures

            createWeatherTimeline(dates, temperatures, forecasts); // Pass forecasts too
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// Create D3.js timeline visualization function
function createWeatherTimeline(dates, temperatures, forecasts) {
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };

    // Dynamically set width based on the container size
    const width = document.getElementById('weatherTimeline').clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous SVG
    d3.select("#weatherTimeline").select("svg").remove();

    const svg = d3.select("#weatherTimeline")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(temperatures) - 5, d3.max(temperatures) + 5])
        .range([height, 0]);

    const line = d3.line()
        .x((d, i) => x(dates[i]))
        .y((d, i) => y(temperatures[i]));

    svg.append("path")
        .datum(temperatures)
        .attr("fill", "none")
        .attr("stroke", "#ff9800") 
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add circles (dots) for each day's temperature
    const dots = svg.selectAll("circle")
        .data(forecasts) 
        .enter()
        .append("circle")
        .attr("cx", (d, i) => x(dates[i])) 
        .attr("cy", d => y(d.day.avgtemp_c))  
        .attr("r", 5)  
        .attr("fill", "#ff9800");

    // Add tooltip for when you hover over the dots
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "3px")
        .style("display", "none");

        dots.on("mouseover", function(event, d) {
            const tooltipContent = `
                <strong>Date:</strong> ${d3.timeFormat("%Y-%m-%d")(new Date(d.date))}<br>
                <strong>Temperature:</strong> ${d.day.avgtemp_c}°C
            `;
            
            
        
            tooltip.style("display", "block")
                .html(tooltipContent)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 30) + "px");

               
        });
}

//diamond
const url = 'https://diamond-api1.p.rapidapi.com/';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '368f314768msh35beee0ff76c364p1be35cjsn45ee135ee7da',
        'x-rapidapi-host': 'diamond-api1.p.rapidapi.com'
    }
};

// tore the fetched data
let diamondData = [];

async function fetchDiamondData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        diamondData = data; // Store the fetched data globally
        console.log("First 5 items of the data:", data.slice(0, 5));
        
        if (data && Array.isArray(data) && data.length > 0) {
            
            applyFilterAndRenderChart();
        } else {
            console.error("No valid data found");
            document.getElementById("loadingMessage").innerText = "No valid data available.";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("loadingMessage").innerText = "Error loading data.";
    }
}

// Appy filter and render the chart
function applyFilterAndRenderChart() {
    const selectedColor = document.getElementById("colorSelect").value;
    const selectedSize = document.getElementById("sizeFilter").value;

    
    let filteredData = diamondData;

    if (selectedColor !== "All") {
        filteredData = filteredData.filter(d => d.fancy_color_dominant_color.toLowerCase() === selectedColor.toLowerCase());
    }

    if (selectedSize) {
        filteredData = filteredData.filter(d => d.size === parseFloat(selectedSize));
    }

    
    renderDiamondChart(filteredData);
}

// Render the chart function
function renderDiamondChart(data) {
    
    d3.select("#diamondChart").select("svg").remove();

    const svgWidth = 800;
    const svgHeight = 600;
    const margin = 50;

    // Create SVG container for the chart
    const svg = d3.select("#diamondChart")
                  .append("svg")
                  .attr("width", svgWidth)
                  .attr("height", svgHeight);

    // Set scales for the X and Y axes and bubble sizes
    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.size)])
                     .range([margin, svgWidth - margin]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.total_sales_price)])
                     .range([svgHeight - margin, margin]);

    const sizeScale = d3.scaleSqrt()
                        .domain([0, 5])
                        .range([5, 50]);

    // Create bubbles based on the data
    const bubbles = svg.selectAll("circle")
                       .data(data)
                       .enter()
                       .append("circle")
                       .attr("cx", d => xScale(d.size))
                       .attr("cy", d => yScale(d.total_sales_price))
                       .attr("r", d => sizeScale(d.clarity === 'I1' ? 1 : (d.clarity === 'SI1' ? 2 : 3)))
                       .attr("fill", "white") 
                       .attr("stroke", "black")
                       .attr("stroke-width", 1)
                       .on("mouseover", function(event, d) {
                           d3.select(this).attr("fill", "rgba(255, 215, 132, 0.7)"); 
                           tooltip.style("display", "block")
                                  .html(`Price: $${d.total_sales_price}<br>Carat: ${d.size}<br>Clarity: ${d.clarity}`)
                                  .style("left", `${event.pageX + 10}px`)
                                  .style("top", `${event.pageY - 30}px`);
                       })
                       .on("mouseout", function() {
                           d3.select(this).attr("fill", "white");
                           tooltip.style("display", "none");
                       });

    // Create X and Y axis with labels
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
       .attr("transform", `translate(0, ${svgHeight - margin})`)
       .call(xAxis);

    svg.append("g")
       .attr("transform", `translate(${margin}, 0)`)
       .call(yAxis);

    // Axis labels with larger font size
    svg.append("text")
       .attr("transform", `translate(${svgWidth / 2}, ${svgHeight - 10})`)
       .style("text-anchor", "middle")
       .style("font-size", "18px") 
       .style("font-weight", "bold") 
       .text("Carat Size");

    svg.append("text")
       .attr("transform", `translate(20, ${svgHeight / 2}) rotate(-90)`)
       .style("text-anchor", "middle")
       .style("font-size", "18px") 
       .style("font-weight", "bold") 
       .text("Price ($)");

    // Tooltip element
    const tooltip = d3.select("body")
                      .append("div")
                      .attr("class", "tooltip")
                      .style("position", "absolute")
                      .style("background", "rgba(0, 0, 0, 0.7)")
                      .style("color", "#fff")
                      .style("padding", "5px")
                      .style("border-radius", "5px")
                      .style("display", "none");
}

// Event listener for the Load Diamond Data button
document.getElementById("loadDiamondDataBtn").addEventListener("click", function() {
    document.getElementById("loadingMessage").style.display = "block"; 
    fetchDiamondData(); 
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

window.addEventListener('scroll', () => {
    document.body.classList.add('scrolled');
});

// back to top  the button
const backToTopButton = document.getElementById("backToTop");

// Show the button when scrolling down
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
};

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// Function to create and append the footer to the body
function createFooter() {
    // Create footer element
    const footer = document.createElement('footer');
    
   
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';

   
    const socialLinks = document.createElement('div');
    socialLinks.className = 'social-links';

   
    const socialMedia = [
        {
            href: "https://www.instagram.com/redpocketstudio_sa?igsh=dmZrd203emc5ODdk",
            label: "Instagram",
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
        </svg>`
        },
        {
            href: "https://wa.me/+27794249260",
            label: "WhatsApp",
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>`
        },
        {
            href: "mailto:redpocket@occanmedia.com",
            label: "Email",
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                  </svg>`
        },
        {
            href: "tel:+27794249260",
            label: "Telephone",
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                  </svg>`
        },
    ];

    // Create social media links
    socialMedia.forEach(media => {
        const link = document.createElement('a');
        link.href = media.href;
        link.target = "_blank"; // Open in new tab
        link.setAttribute('aria-label', media.label);

        
        const svgContainer = document.createElement('div');
        svgContainer.innerHTML = media.svg; // Use innerHTML here safely because this is static SVG

        // Append the SVG to the link
        link.appendChild(svgContainer.firstChild); 

        
        socialLinks.appendChild(link);
    });

    // Create button
    const button = document.createElement('button');
    button.className = 'quote-btn';
    button.textContent = 'Book a Call';
    button.onclick = openForm; 

    // Append social links and button to footer content
    footerContent.appendChild(socialLinks);
    footerContent.appendChild(button);

    // Append footer content to footer
    footer.appendChild(footerContent);

    // Append footer to body or specific container
    document.body.appendChild(footer); 
}

// Call the function to create the footer after the DOM has loaded
document.addEventListener('DOMContentLoaded', createFooter);