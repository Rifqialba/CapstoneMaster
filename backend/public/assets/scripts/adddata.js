document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pokemon-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      id: form.id.value,
      set_name: form.set_name.value,
      name: form.name.value,
      supertype: form.supertype.value,
      subtypes: form.subtypes.value,
      types: form.types.value,
      number: form.number.value,
      rarity: form.rarity.value,
      small_image_url: form.small_image_url.value,
      large_image_url: form.large_image_url.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/pokemons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Pokémon added successfully!");
        form.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error adding Pokémon:", error);
      alert("Failed to add Pokémon. Please try again.");
    }
  });
});
