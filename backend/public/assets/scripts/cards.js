document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.querySelector("#pokemon-table tbody");

  // Fetch and display Pokemon data
  const fetchPokemons = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pokemons");
      const data = await response.json();
      tableBody.innerHTML = ""; // Clear table body before adding new rows
      data.forEach((pokemon) => {
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  // Initial fetch of pokemons
  fetchPokemons();
});
