document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.querySelector("#pokemon-table tbody");
  const searchInput = document.querySelector("#search-input");
  const pageNumberElement = document.querySelector("#page-number");
  const prevPageButton = document.querySelector("#prev-page");
  const nextPageButton = document.querySelector("#next-page");

  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;
  let allPokemons = [];

  // Fetch and display Pokemon data
  const fetchPokemons = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pokemons");
      allPokemons = await response.json();
      displayPokemons();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const displayPokemons = () => {
    // Filter Pokémon by search term
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));

    // Paginate filtered Pokémon
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPokemons = filteredPokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    tableBody.innerHTML = ""; // Clear table body before adding new rows

    paginatedPokemons.forEach((pokemon) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pokemon.id}</td>
        <td>${pokemon.name}</td>
        <td>${pokemon.supertype}</td>
        <td>${pokemon.types}</td>
        <td>${pokemon.rarity}</td>
        <td><img src="${pokemon.small_image_url}" alt="${pokemon.name}" width="50"></td>
        <td>
          <button onclick="editPokemon('${pokemon.id}')">Edit</button>
          <button onclick="deletePokemon('${pokemon.id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Update page number
    pageNumberElement.textContent = `Page ${currentPage}`;

    // Enable or disable pagination buttons
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * ITEMS_PER_PAGE >= filteredPokemons.length;
  };

  // Pagination controls
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPokemons();
    }
  });

  nextPageButton.addEventListener("click", () => {
    if (currentPage * ITEMS_PER_PAGE < allPokemons.length) {
      currentPage++;
      displayPokemons();
    }
  });

  // Search input handler
  searchInput.addEventListener("input", () => {
    currentPage = 1; // Reset to first page on search
    displayPokemons();
  });

  // Initial fetch of pokemons
  fetchPokemons();
});

window.editPokemon = async (id) => {
  const name = prompt("Enter new Pokémon name:");
  if (!name) {
    alert("Name cannot be empty!");
    return;
  }

  const updatedPokemon = { id, name };

  try {
    // Show loading indicator
    alert("Updating Pokémon...");
    const response = await fetch("http://localhost:3000/api/pokemons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPokemon),
    });
    const result = await response.json();
    alert(result.message); // Show response message
    fetchPokemons(); // Refresh the table
  } catch (error) {
    console.error("Error updating Pokémon:", error);
  }
};

window.deletePokemon = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this Pokémon?");
  if (!confirmDelete) return;

  try {
    // Show loading indicator
    alert("Deleting Pokémon...");
    const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    alert(result.message); // Show response message
    fetchPokemons(); // Refresh the table
  } catch (error) {
    console.error("Error deleting Pokémon:", error);
  }
};
