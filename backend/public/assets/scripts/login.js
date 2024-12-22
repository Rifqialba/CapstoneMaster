document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) {
    console.error("Form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Mencegah form melakukan submit default

    const formData = new FormData(loginForm);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    // Reset pesan sebelumnya
    loginMessage.style.display = "none";
    loginMessage.classList.remove("success", "error");

    try {
      // Kirim data login ke backend
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Login berhasil, dapatkan token dan role dari respons
        const { token, user } = result;

        // Simpan token di localStorage atau sessionStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role); // Simpan role

        // Tampilkan pesan sukses
        loginMessage.textContent = "Login successful!";
        loginMessage.classList.add("success");
        loginMessage.style.display = "block";

        // Pengecekan role dan arahkan ke halaman yang sesuai
        setTimeout(() => {
          if (user.role === "admin") {
            window.location.href = "../public/index.html"; // Arahkan ke index.html untuk admin
          } else if (user.role === "public") {
            window.location.href = "../../frontenduser/index.html"; // Arahkan ke home.html untuk user public
          }
        }, 2000); // Tunggu 2 detik sebelum mengarahkan
      } else {
        // Login gagal, tampilkan pesan error
        loginMessage.textContent = result.message || "Login failed! Please try again.";
        loginMessage.classList.add("error");
        loginMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Error during login:", error);
      loginMessage.textContent = "Login failed! Please try again.";
      loginMessage.classList.add("error");
      loginMessage.style.display = "block";
    }
  });
});
