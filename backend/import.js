const fs = require("fs");
const db = require("./db");

// Baca file JSON
const rawData = fs.readFileSync("cards.json");
const cards = JSON.parse(rawData);

// Fungsi untuk mengimpor data
const importCards = () => {
  const sql = `
    INSERT INTO pokemons (id, set_name, name, supertype, subtypes, types, number, rarity, small_image_url, large_image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  cards.forEach((card, index) => {
    console.log(`Processing card ${index + 1}:`, card);
    const values = [
      card.id,
      card.set,
      card.name,
      card.supertype,
      Array.isArray(card.subtypes) ? card.subtypes.join(", ") : "",
      Array.isArray(card.types) ? card.types.join(", ") : "",
      card.number,
      card.rarity,
      card.images?.small || "",
      card.images?.large || "",
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err, card);
      } else {
        console.log(`Inserted card: ${card.name}`);
      }
    });
  });
};

// Jalankan fungsi import
importCards();
