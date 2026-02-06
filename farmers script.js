// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for contacting Farmers Info Hub!");
});

// AI tool example
document.getElementById("uploadImage").addEventListener("click", function() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "AI tool feature will analyze the crop image (this is a placeholder).";
});
