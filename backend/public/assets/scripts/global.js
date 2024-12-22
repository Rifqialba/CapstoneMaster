const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

// Function to handle logout
document.getElementById("logout-btn").addEventListener("click", function () {
  // Clear any session storage or cookies related to the user
  sessionStorage.removeItem("userToken"); // Example: remove a user token from session storage
  localStorage.removeItem("user"); // Example: remove user data from local storage

  // Redirect to the login page or homepage
  window.location.href = "login.html"; // Change this to the login or home page URL
});
