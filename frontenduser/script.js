fetch("http://localhost:3000/api/pokemons")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    if (data && data.length > 0) {
      const perPage = 10;
      let currentPage = 1;

      const totalPages = Math.ceil(data.length / perPage);

      function renderPage(page) {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const pokemonSubset = data.slice(startIndex, endIndex);

        const container = document.querySelector(".pokemon-container");
        container.innerHTML = "";

        pokemonSubset.forEach((pokemon) => {
          const pokemonCard = document.createElement("div");
          pokemonCard.classList.add("pokemon-card");

          pokemonCard.innerHTML = `
            <img src="${pokemon.small_image_url}" alt="${
            pokemon.name
          }" class="pokemon-image">
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

        document.getElementById("page-number").textContent = `Page ${page}`;
      }

      function changePage(direction) {
        if (direction === "next" && currentPage < totalPages) {
          currentPage++;
        } else if (direction === "prev" && currentPage > 1) {
          currentPage--;
        }

        renderPage(currentPage);
      }

      document
        .getElementById("next-btn")
        .addEventListener("click", () => changePage("next"));
      document
        .getElementById("prev-btn")
        .addEventListener("click", () => changePage("prev"));

      renderPage(currentPage);
    } else {
      console.error("Data not found or empty array");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
