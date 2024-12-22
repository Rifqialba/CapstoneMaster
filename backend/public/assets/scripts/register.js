document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const secretKey = document.getElementById("secretKey").value;

  const payload = { username, password, role };
  if (role === "admin" && secretKey) {
    payload.secretKey = secretKey;
  }

  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (response.status === 201) {
    alert(data.message);
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
});

document.getElementById("role").addEventListener("change", function () {
  const adminSecretKeyField = document.getElementById("adminSecretKey");
  if (this.value === "admin") {
    adminSecretKeyField.style.display = "block";
  } else {
    adminSecretKeyField.style.display = "none";
  }
});
