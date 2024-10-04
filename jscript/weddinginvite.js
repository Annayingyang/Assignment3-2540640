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

// Sample data for the graph
const data = [
    { type: 'Paper Invite', happiness: 0 },
    { type: 'Our Invites', happiness: 100 },
];

// Set up SVG dimensions
const svgWidth = 600;
const svgHeight = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// Create SVG element
const svg = d3.select("#happinessGraph")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

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
    .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10)) // Hide tick lines
    .selectAll("text")
    .attr("fill", "#fff"); // White x-axis labels

// Add y-axis
svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale).ticks(5)) // Show 5 ticks on y-axis
    .selectAll("text")
    .attr("fill", "#fff"); // White y-axis labels

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
        window.removeEventListener("scroll", animateLine); // Remove the event listener after triggering
    }
});
