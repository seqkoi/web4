const form = document.getElementById("signupForm");
const success = document.getElementById("formSuccess");

const rules = {
  fullName(value) {
    if (!value.trim()) return "Enter your full name.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  email(value) {
    if (!value.trim()) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "Enter a valid email, for example name@example.com.";
    return "";
  },
  password(value) {
    if (!value) return "Create a password.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return "Password must include a letter and a number.";
    return "";
  },
  confirmPassword(value) {
    if (!value) return "Confirm your password.";
    if (value !== form.elements.password.value) return "Passwords do not match.";
    return "";
  },
  terms() {
    return form.elements.terms.checked ? "" : "You must agree to the terms to continue.";
  }
};

function validateField(name) {
  const field = form.elements[name];
  const message = rules[name](field.value);
  document.getElementById(name + "Error").textContent = message;
  if (field.type !== "checkbox") {
    field.classList.toggle("invalid", Boolean(message));
    field.classList.toggle("valid", !message);
  }
  return !message;
}

function validateForm() {
  return Object.keys(rules).map(validateField).every(Boolean);
}

Object.keys(rules).forEach(name => {
  const field = form.elements[name];
  const eventName = field.type === "checkbox" ? "change" : "blur";
  field.addEventListener(eventName, () => validateField(name));
  field.addEventListener("input", () => {
    if (field.classList.contains("invalid")) validateField(name);
    if (name === "password" && form.elements.confirmPassword.value) validateField("confirmPassword");
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  success.textContent = "";
  if (validateForm()) {
    success.textContent = "Thank you for signing up, " + form.elements.fullName.value.trim() + "! We will contact you soon.";
    form.reset();
    form.querySelectorAll("input").forEach(input => input.classList.remove("valid"));
  } else {
    const firstInvalid = form.querySelector(".invalid") || form.elements.terms;
    firstInvalid.focus();
  }
});
