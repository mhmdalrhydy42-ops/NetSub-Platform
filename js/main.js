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

// Package Selection
const subscribeButtons = document.querySelectorAll(".subscribe-btn");
const toast = document.getElementById("toast");

subscribeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedPackage = button.dataset.package;

    toast.textContent = selectedPackage + " selected successfully!";
    toast.classList.add("show-toast");

    setTimeout(function () {
      toast.classList.remove("show-toast");
    }, 2500);

    document.getElementById("subscribe").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Provider Modal
const providerButtons = document.querySelectorAll(".provider-btn");
const providerModal = document.getElementById("providerModal");
const closeModal = document.getElementById("closeModal");
const modalProviderName = document.getElementById("modalProviderName");
const modalPackageList = document.getElementById("modalPackageList");

providerButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const providerName = button.dataset.provider;
    const packages = button.dataset.packages.split(",");

    modalProviderName.textContent = providerName;
    modalPackageList.innerHTML = "";

    packages.forEach(function (packageName) {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-check"></i> ${packageName.trim()}`;
      modalPackageList.appendChild(li);
    });

    providerModal.classList.add("show-modal");
  });
});

closeModal.addEventListener("click", function () {
  providerModal.classList.remove("show-modal");
});

providerModal.addEventListener("click", function (event) {
  if (event.target === providerModal) {
    providerModal.classList.remove("show-modal");
  }
});