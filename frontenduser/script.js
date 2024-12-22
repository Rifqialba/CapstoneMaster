// Fetch the Pokémon data from the API
fetch("http://localhost:3000/api/pokemons")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Cek struktur data yang diterima

    if (data && data.length > 0) {
      // Hapus semua konten lama dalam container sebelum menambahkan yang baru
      const container = document.querySelector(".pokemon-container");
      container.innerHTML = ""; // Bersihkan container

      // Loop untuk setiap Pokemon dalam array
      data.forEach((pokemon) => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");

        // Menambahkan konten HTML ke dalam pokemonCard
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

        // Menambahkan card ke container
        container.appendChild(pokemonCard);
      });
    } else {
      console.error("Data not found or empty array");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
