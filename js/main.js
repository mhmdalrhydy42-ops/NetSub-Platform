// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show-menu");
});

// Close menu when clicking a link
const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show-menu");
  });
});

// Dark / Light Mode
const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn.querySelector("i");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});