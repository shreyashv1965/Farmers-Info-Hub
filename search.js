const sitePages = [
  { title: "Home", url: "index.html", content: "farmers agriculture sustainable modern" },
  { title: "Farming Techniques", url: "Farming Techniques.html", content: "farming techniques drip irrigation organic" },
  { title: "Image Gallery", url: "Image Gallery.html", content: "images gallery farming photos" },
  { title: "Modern Farming Tools", url: "Modern Farming Tools.html", content: "tools machinery tractor drone" },
  { title: "Challenges in Agriculture", url: "Challenges in Farming.html", content: "challenges climate water soil" },
  { title: "Contact Us", url: "Contact Us.html", content: "contact farmers info hub" }
];

// 🔹 Escape special regex characters
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 🔹 Main search function
function runSearch(query) {
  const results = document.getElementById("results");
  const suggestions = document.getElementById("suggestions");
  results.innerHTML = "";
  suggestions.innerHTML = "";

  if (!query) return;

  const regex = new RegExp(escapeRegex(query), "gi");

  const matches = sitePages.filter(page =>
    page.title.toLowerCase().includes(query) ||
    page.content.includes(query)
  );

  if (matches.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  matches.forEach(page => {
    const highlightedTitle = page.title.replace(regex, match =>
      `<mark>${match}</mark>`
    );

    const div = document.createElement("div");
    div.innerHTML = `<a href="${page.url}">${highlightedTitle}</a>`;
    results.appendChild(div);
  });

  // ✅ Auto‑scroll to results
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}

// 🔹 Auto‑suggest while typing
function autoSuggest(query) {
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (!query) return;

  sitePages
    .filter(page => page.title.toLowerCase().includes(query))
    .forEach(page => {
      const li = document.createElement("li");
      li.textContent = page.title;
      li.onclick = () => {
        document.getElementById("searchInput").value = page.title;
        suggestions.innerHTML = "";
        runSearch(page.title.toLowerCase());
      };
      suggestions.appendChild(li);
    });
}
``
