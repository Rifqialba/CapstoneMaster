let currentPage = 1;
const itemsPerPage = 9;
let pokemons = [];
let filteredPokemons = []; // Declare filteredPokemons globally

// Function to render Pokémon cards
function renderPokemons(page) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = ""; // Clear previous content

  // Use filteredPokemons if available, otherwise use the original pokemons
  const dataToRender = filteredPokemons.length > 0 ? filteredPokemons : pokemons;

  // Filter and paginate the Pokémon data
  const paginatedPokemons = dataToRender.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  paginatedPokemons.forEach((pokemon) => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    pokemonCard.innerHTML = `
      <img src="${pokemon.small_image_url}" alt="${pokemon.name}" class="pokemon-image">
      <div class="pokemon-info">
        <h2>${pokemon.name || "Name not available"}</h2>
        <p>#${pokemon.number || "N/A"}</p>
        <p>Type: ${pokemon.types || "N/A"}</p>
        <p>Rarity: ${pokemon.rarity || "N/A"}</p>
        <p>Subtypes: ${pokemon.subtypes || "N/A"}</p>
      </div>
    `;

    container.appendChild(pokemonCard);
  });

  renderPagination(dataToRender.length, page);
}

// Function to render Next and Previous buttons
function renderPagination(totalItems, currentPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // Clear existing pagination

  // Create Previous button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPokemons(currentPage);
    }
  };
  if (currentPage === 1) {
    prevButton.disabled = true; // Disable if on the first page
  }
  pagination.appendChild(prevButton);

  // Create Next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPokemons(currentPage);
    }
  };
  if (currentPage === totalPages) {
    nextButton.disabled = true; // Disable if on the last page
  }
  pagination.appendChild(nextButton);
}

// Function to handle search input
function handleSearch(event) {
  const searchQuery = event.target.value.toLowerCase();

  // Filter the Pokémon data based on the search query
  filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery));

  // Re-render the Pokémon cards with the filtered data
  renderPokemons(1); // Start from the first page when searching
}

// Fetch Pokémon data from API
fetch("http://localhost:3000/api/pokemons")
  .then((response) => response.json())
  .then((data) => {
    pokemons = data;
    filteredPokemons = data; // Initially, no filter is applied
    renderPokemons(currentPage); // Initial render

    // Add search functionality
    document.getElementById("search-input").addEventListener("input", handleSearch);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
