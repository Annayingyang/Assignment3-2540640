// Function to toggle the navigation overlay
function toggleNav() {
    var navOverlay = document.getElementById("navOverlay");
    if (navOverlay.style.width === "100%") {
        navOverlay.style.width = "0";
    } else {
        navOverlay.style.width = "100%";
    }
}
