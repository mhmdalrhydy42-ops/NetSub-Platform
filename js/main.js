// ===============================
// Helper: Current Language
// ===============================
function getCurrentLanguage() {
  return localStorage.getItem("language") || "en";
}

function isArabic() {
  return getCurrentLanguage() === "ar";
}

// ===============================
// Mobile Menu
// ===============================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show-menu");
  });
}

// Close menu when clicking a link
const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show-menu");
  });
});

// ===============================
// Navbar Active Link On Scroll
// ===============================
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNavLink() {
  let currentSection = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

// ===============================
// Dark / Light Mode
// ===============================
const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");

  if (themeIcon) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

if (themeBtn && themeIcon) {
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      localStorage.setItem("theme", "dark");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });
}

// ===============================
// Language Translation
// ===============================
const langBtn = document.getElementById("langBtn");
const languageMenu = document.getElementById("languageMenu");
const languageOptions = document.querySelectorAll(".language-menu button");

const packageTranslations = {
  "Basic Plan": {
    en: "Basic Plan",
    ar: "الباقة الأساسية"
  },
  "Standard Plan": {
    en: "Standard Plan",
    ar: "الباقة القياسية"
  },
  "Premium Plan": {
    en: "Premium Plan",
    ar: "الباقة المميزة"
  }
};

const providerTranslations = {
  "Yemen Mobile": {
    en: "Yemen Mobile",
    ar: "يمن موبايل"
  },
  "Sabafon": {
    en: "Sabafon",
    ar: "سبأفون"
  },
  "YOU": {
    en: "YOU",
    ar: "YOU"
  }
};

function translatePackageName(packageName) {
  const lang = getCurrentLanguage();
  return packageTranslations[packageName]?.[lang] || packageName;
}

function translateProviderName(providerName) {
  const lang = getCurrentLanguage();
  return providerTranslations[providerName]?.[lang] || providerName;
}

function translatePage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  const translatableElements = document.querySelectorAll("[data-en][data-ar]");

  translatableElements.forEach(function (element) {
    element.textContent = element.dataset[lang];
  });

  const placeholderElements = document.querySelectorAll("[data-en-placeholder][data-ar-placeholder]");

  placeholderElements.forEach(function (element) {
    element.placeholder = element.dataset[lang + "Placeholder"];
  });
  
refreshDynamicRowsLanguage();

  localStorage.setItem("language", lang);

  if (languageMenu) {
    languageMenu.classList.remove("show-language-menu");
  }
}

if (langBtn && languageMenu) {
  langBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    languageMenu.classList.toggle("show-language-menu");
  });
}

languageOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    translatePage(option.dataset.lang);
  });
});

document.addEventListener("click", function () {
  if (languageMenu) {
    languageMenu.classList.remove("show-language-menu");
  }
});

// Load saved language
translatePage(getCurrentLanguage());

// ===============================
// Toast Message
// ===============================
const toast = document.getElementById("toast");

function showToast(messageEn, messageAr) {
  if (!toast) return;

  toast.textContent = isArabic() ? messageAr : messageEn;
  toast.classList.add("show-toast");

  setTimeout(function () {
    toast.classList.remove("show-toast");
  }, 2500);
}

// ===============================
// Package Selection
// ===============================
const subscribeButtons = document.querySelectorAll(".subscribe-btn");
const packageSelect = document.getElementById("packageSelect");

subscribeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedPackage = button.dataset.package;

    if (packageSelect) {
      packageSelect.value = selectedPackage;
    }

    showToast(
      selectedPackage + " selected successfully!",
      "تم اختيار " + translatePackageName(selectedPackage) + " بنجاح!"
    );

    const subscribeSection = document.getElementById("subscribe");

    if (subscribeSection) {
      subscribeSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ===============================
// Provider Modal
// ===============================
const providerButtons = document.querySelectorAll(".provider-btn");
const providerModal = document.getElementById("providerModal");
const closeModal = document.getElementById("closeModal");
const modalProviderName = document.getElementById("modalProviderName");
const modalPackageList = document.getElementById("modalPackageList");

providerButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const providerName = button.dataset.provider;
    const packages = button.dataset.packages.split(",");

    if (modalProviderName) {
      modalProviderName.textContent = translateProviderName(providerName);
    }

    if (modalPackageList) {
      modalPackageList.innerHTML = "";

      packages.forEach(function (packageName) {
        const cleanPackageName = packageName.trim();
        const li = document.createElement("li");

        li.innerHTML = `<i class="fa-solid fa-check"></i> ${translatePackageName(cleanPackageName)}`;
        modalPackageList.appendChild(li);
      });
    }

    if (providerModal) {
      providerModal.classList.add("show-modal");
    }
  });
});

if (closeModal && providerModal) {
  closeModal.addEventListener("click", function () {
    providerModal.classList.remove("show-modal");
  });
}

if (providerModal) {
  providerModal.addEventListener("click", function (event) {
    if (event.target === providerModal) {
      providerModal.classList.remove("show-modal");
    }
  });
}

// ===============================
// Dashboard Data & Helpers
// ===============================
const subscriptionsTableBody = document.getElementById("subscriptionsTableBody");

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function getStatusFromPayment(paymentStatus) {
  if (paymentStatus === "paid") {
    return "active";
  }

  if (paymentStatus === "pending") {
    return "pending";
  }

  return "pending";
}

function getPaymentClass(paymentStatus) {
  if (paymentStatus === "paid") return "paid";
  if (paymentStatus === "pending") return "pending";
  return "unpaid";
}

function getStatusText(status) {
  const lang = getCurrentLanguage();

  const statusText = {
    active: {
      en: "Active",
      ar: "نشط"
    },
    pending: {
      en: "Pending",
      ar: "قيد الانتظار"
    },
    expired: {
      en: "Expired",
      ar: "منتهي"
    }
  };

  return statusText[status]?.[lang] || status;
}

function getPaymentText(paymentStatus) {
  const lang = getCurrentLanguage();

  const paymentText = {
    paid: {
      en: "Paid",
      ar: "مدفوع"
    },
    pending: {
      en: "Pending",
      ar: "قيد الانتظار"
    },
    unpaid: {
      en: "Unpaid",
      ar: "غير مدفوع"
    }
  };

  return paymentText[paymentStatus]?.[lang] || paymentStatus;
}

function createSubscriptionRow(subscription) {
  const row = document.createElement("tr");
  row.dataset.status = subscription.status;
  row.dataset.dynamic = "true";

  row.innerHTML = `
    <td>${subscription.username}</td>
    <td>${translatePackageName(subscription.packageName)}</td>
    <td>${translateProviderName(subscription.providerName)}</td>
    <td>${subscription.startDate}</td>
    <td>${subscription.endDate}</td>
    <td>
      <span class="status-badge ${subscription.status}">
        ${getStatusText(subscription.status)}
      </span>
    </td>
    <td>
      <span class="payment-badge ${getPaymentClass(subscription.paymentStatus)}">
        ${getPaymentText(subscription.paymentStatus)}
      </span>
    </td>
  `;

  return row;
}

function getSavedSubscriptions() {
  return JSON.parse(localStorage.getItem("subscriptions")) || [];
}

function saveSubscription(subscription) {
  const subscriptions = getSavedSubscriptions();
  subscriptions.push(subscription);
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
}

function loadSavedSubscriptions() {
  if (!subscriptionsTableBody) return;

  const savedSubscriptions = getSavedSubscriptions();

  savedSubscriptions.forEach(function (subscription) {
    const row = createSubscriptionRow(subscription);
    subscriptionsTableBody.appendChild(row);
  });
}

function refreshDynamicRowsLanguage() {
  const dynamicRows = document.querySelectorAll('tr[data-dynamic="true"]');
  const savedSubscriptions = getSavedSubscriptions();

  dynamicRows.forEach(function (row, index) {
    const subscription = savedSubscriptions[index];

    if (subscription) {
      const newRow = createSubscriptionRow(subscription);
      row.replaceWith(newRow);
    }
  });
}

function updateDashboardStats() {
  const allRows = document.querySelectorAll("#subscriptionsTableBody tr");

  const totalUsers = document.querySelector(".dashboard-stat-card:nth-child(1) h3");
  const activeSubscriptions = document.querySelector(".dashboard-stat-card:nth-child(2) h3");
  const pendingPayments = document.querySelector(".dashboard-stat-card:nth-child(3) h3");
  const expiredSubscriptions = document.querySelector(".dashboard-stat-card:nth-child(4) h3");

  let activeCount = 0;
  let pendingCount = 0;
  let expiredCount = 0;

  allRows.forEach(function (row) {
    if (row.dataset.status === "active") activeCount++;
    if (row.dataset.status === "pending") pendingCount++;
    if (row.dataset.status === "expired") expiredCount++;
  });

  if (totalUsers) totalUsers.textContent = allRows.length;
  if (activeSubscriptions) activeSubscriptions.textContent = activeCount;
  if (pendingPayments) pendingPayments.textContent = pendingCount;
  if (expiredSubscriptions) expiredSubscriptions.textContent = expiredCount;
}

// Load saved subscriptions when page opens
loadSavedSubscriptions();
updateDashboardStats();

// ===============================
// Subscription Form Validation
// ===============================
const subscriptionForm = document.getElementById("subscriptionForm");
const successMessage = document.getElementById("successMessage");

const validationMessages = {
  fullNameRequired: {
    en: "Full name is required",
    ar: "الاسم الكامل مطلوب"
  },
  usernameRequired: {
    en: "Username is required",
    ar: "اسم المستخدم مطلوب"
  },
  emailRequired: {
    en: "Email is required",
    ar: "البريد الإلكتروني مطلوب"
  },
  emailInvalid: {
    en: "Please enter a valid email",
    ar: "يرجى إدخال بريد إلكتروني صحيح"
  },
  phoneRequired: {
    en: "Phone number is required",
    ar: "رقم الهاتف مطلوب"
  },
  phoneInvalid: {
    en: "Phone number must be at least 7 digits",
    ar: "يجب أن يكون رقم الهاتف 7 أرقام على الأقل"
  },
  providerRequired: {
    en: "Please choose a provider",
    ar: "يرجى اختيار مزود الخدمة"
  },
  packageRequired: {
    en: "Please choose a package",
    ar: "يرجى اختيار الباقة"
  },
  startDateRequired: {
    en: "Start date is required",
    ar: "تاريخ البداية مطلوب"
  },
  paymentStatusRequired: {
    en: "Please choose payment status",
    ar: "يرجى اختيار حالة الدفع"
  }
};

function getMessage(key) {
  const lang = getCurrentLanguage();
  return validationMessages[key][lang];
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  formGroup.classList.remove("success");

  if (errorMessage) {
    errorMessage.textContent = message;
  }
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  formGroup.classList.add("success");

  if (errorMessage) {
    errorMessage.textContent = "";
  }
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

if (subscriptionForm) {
  subscriptionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const providerSelect = document.getElementById("providerSelect");
    const packageSelectInput = document.getElementById("packageSelect");
    const startDate = document.getElementById("startDate");
    const paymentStatus = document.getElementById("paymentStatus");

    let isValid = true;

    if (fullName.value.trim() === "") {
      showError(fullName, getMessage("fullNameRequired"));
      isValid = false;
    } else {
      showSuccess(fullName);
    }

    if (username.value.trim() === "") {
      showError(username, getMessage("usernameRequired"));
      isValid = false;
    } else {
      showSuccess(username);
    }

    if (email.value.trim() === "") {
      showError(email, getMessage("emailRequired"));
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, getMessage("emailInvalid"));
      isValid = false;
    } else {
      showSuccess(email);
    }

    if (phone.value.trim() === "") {
      showError(phone, getMessage("phoneRequired"));
      isValid = false;
    } else if (phone.value.trim().length < 7) {
      showError(phone, getMessage("phoneInvalid"));
      isValid = false;
    } else {
      showSuccess(phone);
    }

    if (providerSelect.value === "") {
      showError(providerSelect, getMessage("providerRequired"));
      isValid = false;
    } else {
      showSuccess(providerSelect);
    }

    if (packageSelectInput.value === "") {
      showError(packageSelectInput, getMessage("packageRequired"));
      isValid = false;
    } else {
      showSuccess(packageSelectInput);
    }

    if (startDate.value === "") {
      showError(startDate, getMessage("startDateRequired"));
      isValid = false;
    } else {
      showSuccess(startDate);
    }

    if (paymentStatus.value === "") {
      showError(paymentStatus, getMessage("paymentStatusRequired"));
      isValid = false;
    } else {
      showSuccess(paymentStatus);
    }

    if (isValid) {
      const selectedPackage = packageSelectInput.value;
      const selectedProvider = providerSelect.value;
      const selectedPaymentStatus = paymentStatus.value;
      const subscriptionStatus = getStatusFromPayment(selectedPaymentStatus);

      const newSubscription = {
        username: username.value.trim(),
        packageName: selectedPackage,
        providerName: selectedProvider,
        startDate: startDate.value,
        endDate: addDays(startDate.value, 30),
        status: subscriptionStatus,
        paymentStatus: selectedPaymentStatus
      };

      const row = createSubscriptionRow(newSubscription);
      subscriptionsTableBody.appendChild(row);

      saveSubscription(newSubscription);
      updateDashboardStats();

      if (successMessage) {
        successMessage.textContent = isArabic()
          ? "تم إنشاء الاشتراك بنجاح في " + translatePackageName(selectedPackage) + " مع " + translateProviderName(selectedProvider) + "!"
          : "Subscription created successfully for " + selectedPackage + " with " + selectedProvider + "!";

        successMessage.classList.add("show-success");
      }

      showToast(
        "Subscription submitted successfully and added to dashboard!",
        "تم إرسال الاشتراك وإضافته إلى لوحة التحكم بنجاح!"
      );

      subscriptionForm.reset();

      setTimeout(function () {
        const dashboardSection = document.getElementById("dashboard");

        if (dashboardSection) {
          dashboardSection.scrollIntoView({
            behavior: "smooth"
          });
        }
      }, 800);
    }
  });
}

// ===============================
// Dashboard Table Filters
// ===============================
function applyDashboardFilter(filterValue) {
  const allRows = document.querySelectorAll("#subscriptionsTableBody tr");

  allRows.forEach(function (row) {
    const rowStatus = row.dataset.status;

    if (filterValue === "all" || filterValue === rowStatus) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filterValue = button.dataset.filter;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    applyDashboardFilter(filterValue);
  });
});