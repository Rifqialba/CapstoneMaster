document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.querySelector("#pokemon-table tbody");
  const searchInput = document.querySelector("#search-input");
  const pageNumberElement = document.querySelector("#page-number");
  const prevPageButton = document.querySelector("#prev-page");
  const nextPageButton = document.querySelector("#next-page");

  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;
  let allPokemons = [];

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
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPokemons = filteredPokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    tableBody.innerHTML = "";

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

    pageNumberElement.textContent = `Page ${currentPage}`;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * ITEMS_PER_PAGE >= filteredPokemons.length;
  };

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

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    displayPokemons();
  });

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
    alert("Updating Pokémon...");
    const response = await fetch("http://localhost:3000/api/pokemons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPokemon),
    });
    const result = await response.json();
    alert(result.message);
    fetchPokemons();
  } catch (error) {
    console.error("Error updating Pokémon:", error);
  }
};

window.deletePokemon = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this Pokémon?");
  if (!confirmDelete) return;

  try {
    alert("Deleting Pokémon...");
    const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    alert(result.message);
    fetchPokemons();
  } catch (error) {
    console.error("Error deleting Pokémon:", error);
  }
};
