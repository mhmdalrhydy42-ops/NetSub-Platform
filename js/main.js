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
const packageSelect = document.getElementById("packageSelect");

subscribeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedPackage = button.dataset.package;

    if (packageSelect) {
      packageSelect.value = selectedPackage;
    }

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

// Subscription Form Validation
const subscriptionForm = document.getElementById("subscriptionForm");
const successMessage = document.getElementById("successMessage");

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  formGroup.classList.remove("success");
  errorMessage.textContent = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  formGroup.classList.add("success");
  errorMessage.textContent = "";
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

subscriptionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const providerSelect = document.getElementById("providerSelect");
  const packageSelect = document.getElementById("packageSelect");
  const startDate = document.getElementById("startDate");
  const paymentStatus = document.getElementById("paymentStatus");

  let isValid = true;

  if (fullName.value.trim() === "") {
    showError(fullName, "Full name is required");
    isValid = false;
  } else {
    showSuccess(fullName);
  }

  if (username.value.trim() === "") {
    showError(username, "Username is required");
    isValid = false;
  } else {
    showSuccess(username);
  }

  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    showError(email, "Please enter a valid email");
    isValid = false;
  } else {
    showSuccess(email);
  }

  if (phone.value.trim() === "") {
    showError(phone, "Phone number is required");
    isValid = false;
  } else if (phone.value.trim().length < 7) {
    showError(phone, "Phone number must be at least 7 digits");
    isValid = false;
  } else {
    showSuccess(phone);
  }

  if (providerSelect.value === "") {
    showError(providerSelect, "Please choose a provider");
    isValid = false;
  } else {
    showSuccess(providerSelect);
  }

  if (packageSelect.value === "") {
    showError(packageSelect, "Please choose a package");
    isValid = false;
  } else {
    showSuccess(packageSelect);
  }

  if (startDate.value === "") {
    showError(startDate, "Start date is required");
    isValid = false;
  } else {
    showSuccess(startDate);
  }

  if (paymentStatus.value === "") {
    showError(paymentStatus, "Please choose payment status");
    isValid = false;
  } else {
    showSuccess(paymentStatus);
  }

  if (isValid) {
    successMessage.textContent =
      "Subscription created successfully for " + packageSelect.value + " with " + providerSelect.value + "!";
    successMessage.classList.add("show-success");

    toast.textContent = "Subscription submitted successfully!";
    toast.classList.add("show-toast");

    setTimeout(function () {
      toast.classList.remove("show-toast");
    }, 2500);
  }
});