document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) {
    console.error("Form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    loginMessage.style.display = "none";
    loginMessage.classList.remove("success", "error");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const { token, user } = result;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        loginMessage.textContent = "Login successful!";
        loginMessage.classList.add("success");
        loginMessage.style.display = "block";

        setTimeout(() => {
          if (user.role === "admin") {
            window.location.href = "../public/index.html";
          } else if (user.role === "public") {
            window.location.href = "../../frontenduser/index.html";
          }
        }, 2000);
      } else {
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
