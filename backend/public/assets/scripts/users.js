document.addEventListener("DOMContentLoaded", () => {
  const userTableBody = document.querySelector("#user-table tbody");

  // Fungsi untuk memuat data pengguna
  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }

      const users = await response.json();

      if (!Array.isArray(users)) {
        throw new Error("The data received is not an array.");
      }

      userTableBody.innerHTML = ""; // Kosongkan tabel sebelum mengisi
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.role}</td>
          <td>
            <button class="btn-delete" data-id="${user.id}">Delete</button>
          </td>
        `;
        userTableBody.appendChild(row);
      });

      // Event listener untuk tombol hapus
      document.querySelectorAll(".btn-delete").forEach((button) => {
        button.addEventListener("click", async (e) => {
          const userId = e.target.dataset.id;

          try {
            await fetch(`http://localhost:3000/api/users/${userId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            alert("User deleted successfully!");
            fetchUsers(); // Refresh data
          } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
          }
        });
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error.message); // Menampilkan pesan error yang lebih informatif
    }
  }

  // Panggil fungsi untuk memuat data pengguna
  fetchUsers();
});
