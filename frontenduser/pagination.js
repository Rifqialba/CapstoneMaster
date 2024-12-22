const pokemonData = [];

const perPage = 9;
let currentPage = 1;

function renderPage(page) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pokemonSubset = pokemonData.slice(startIndex, endIndex);

  const container = document.querySelector(".pokemon-container");
  container.innerHTML = "";

  pokemonSubset.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
        <img src="${pokemon.imageUrl}" alt="Pokemon Image" />
        <div class="pokemon-info">
          <h2>${pokemon.name}</h2>
          <p>${pokemon.number}</p>
          <p>${pokemon.type}</p>
          <p>${pokemon.rarity}</p>
          <p>${pokemon.subtypes}</p>
        </div>
      `;
    container.appendChild(card);
  });

  document.getElementById("page-number").textContent = `Page ${page}`;
}

function changePage(direction) {
  const totalPages = Math.ceil(pokemonData.length / perPage);

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
