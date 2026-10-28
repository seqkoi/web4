const colors = ["#eef3ff", "#ffe9ec", "#e6f7f1", "#fff4dc", "#f1e8ff", "#e4f4fb"];
let colorIndex = 0;

const dateTime = document.getElementById("dateTime");
const colorBtn = document.getElementById("colorBtn");
const popup = document.getElementById("popup");
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const subscribeForm = document.getElementById("subscribeForm");
const subEmail = document.getElementById("subEmail");
const subError = document.getElementById("subError");
const subSuccess = document.getElementById("subSuccess");

function formatDateTime(date) {
  const day = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
  return day + ", " + time;
}

function updateDateTime() {
  dateTime.textContent = formatDateTime(new Date());
}

function changeBackground() {
  colorIndex = (colorIndex + 1) % colors.length;
  document.body.style.backgroundColor = colors[colorIndex];
}

function toggleAnswer(button) {
  const answer = document.getElementById(button.getAttribute("aria-controls"));
  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isOpen));
  answer.style.maxHeight = isOpen ? "0px" : answer.scrollHeight + "px";
}

function showPopup() {
  popup.classList.remove("hidden");
  popup.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => popup.classList.add("open"));
  subEmail.focus();
}

function hidePopup() {
  popup.classList.remove("open");
  popup.setAttribute("aria-hidden", "true");
  setTimeout(() => popup.classList.add("hidden"), 250);
  openPopup.focus();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

updateDateTime();
setInterval(updateDateTime, 1000);

colorBtn.addEventListener("click", changeBackground);

document.querySelectorAll(".question").forEach(button => {
  button.addEventListener("click", () => toggleAnswer(button));
});

openPopup.addEventListener("click", showPopup);
closePopup.addEventListener("click", hidePopup);

popup.addEventListener("click", event => {
  if (event.target === popup) hidePopup();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && popup.classList.contains("open")) hidePopup();
});

subscribeForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = subEmail.value.trim();
  subSuccess.textContent = "";
  if (!value) {
    subError.textContent = "Enter your email address.";
    subEmail.classList.add("invalid");
    return;
  }
  if (!isValidEmail(value)) {
    subError.textContent = "Enter a valid email, for example name@example.com.";
    subEmail.classList.add("invalid");
    return;
  }
  subError.textContent = "";
  subEmail.classList.remove("invalid");
  subSuccess.textContent = "Thank you for subscribing!";
  subscribeForm.reset();
});
