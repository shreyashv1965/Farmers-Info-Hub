const sitePages = [
  { title: "Home", url: "index.html", content: "farmers agriculture sustainable modern crop production soil water" },
  { title: "Farming Techniques", url: "Farming Techniques.html", content: "farming techniques drip irrigation organic crop rotation hydroponics precision" },
  { title: "Image Gallery", url: "Image Gallery.html", content: "images gallery farming photos tractors crops fields drones" },
  { title: "Modern Farming Tools", url: "Modern Farming Tools.html", content: "tools machinery tractor drone harvester smart sensors irrigation kits" },
  { title: "Challenges in Agriculture", url: "Challenges in Farming.html", content: "challenges climate water soil pests market pricing weather pests" },
  { title: "Contact Us", url: "Contact Us.html", content: "contact email form address location support feedback farmers info hub" }
];

// 🔹 Escape special regex characters
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 🔹 Main search function
function runSearch(query) {
  const results = document.getElementById("results");
  const suggestions = document.getElementById("suggestions");
  
  if (!results) return; // Guard clause in case element doesn't exist
  
  results.innerHTML = "";
  if (suggestions) suggestions.innerHTML = "";

  // Trim spaces and convert to lowercase for exact matching
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return;

  const regex = new RegExp(escapeRegex(cleanQuery), "gi");

  // FIX: Converted both sides to lowercase to prevent case-sensitive mismatches
  const matches = sitePages.filter(page =>
    page.title.toLowerCase().includes(cleanQuery) ||
    page.content.toLowerCase().includes(cleanQuery)
  );

  if (matches.length === 0) {
    results.innerHTML = "<p style='color: #777; padding: 10px;'>No results found.</p>";
    return;
  }

  matches.forEach(page => {
    const highlightedTitle = page.title.replace(regex, match => `<mark>${match}</mark>`);
    const div = document.createElement("div");
    div.style.padding = "8px 0";
    div.innerHTML = `<a href="${page.url}" style="color: #4CAF50; font-weight: bold; text-decoration: none;">${highlightedTitle} &rarr;</a>`;
    results.appendChild(div);
  });

  // ✅ Auto‑scroll to results safely
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// 🔹 Auto‑suggest while typing
function autoSuggest(query) {
  const suggestions = document.getElementById("suggestions");
  if (!suggestions) return;
  
  suggestions.innerHTML = "";

  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return;

  sitePages
    .filter(page => page.title.toLowerCase().includes(cleanQuery))
    .forEach(page => {
      const li = document.createElement("li");
      li.textContent = page.title;
      li.style.cursor = "pointer";
      li.onclick = () => {
        const searchInput = document.getElementById("searchInput");
        if (searchInput) searchInput.value = page.title;
        suggestions.innerHTML = "";
        runSearch(page.title);
      };
      suggestions.appendChild(li);
    });
}

// 🔹 FIX: Hook everything up to the HTML DOM when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".search-container button"); // target your existing button

  if (searchInput) {
    // Run suggest function as user types
    searchInput.addEventListener("input", (e) => {
      autoSuggest(e.target.value);
    });

    // Run search instantly if user presses "Enter" key
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        runSearch(e.target.value);
      }
    });
  }

  if (searchButton && searchInput) {
    // Run search when search button is clicked
    searchButton.addEventListener("click", () => {
      runSearch(searchInput.value);
    });
  }
});
