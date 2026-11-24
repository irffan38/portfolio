/* ==========================================================
   script.js - ONE script for all pages.
   Each feature first checks that its element exists on the
   current page (if-statement), so no errors on other pages.
   ========================================================== */

/* ---------- Feature 1: Automatic copyright year ---------- */
var yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ---------- Feature 2: Hamburger menu (mobile) ---------- */
var menuBtn = document.getElementById("menu-btn");
var navLinks = document.getElementById("nav-links");
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");   // add/remove class "open"
  });
}

/* ---------- Feature 3: Dark / light mode toggle ---------- */
var themeBtn = document.getElementById("theme-btn");
// Load the saved choice (so it stays the same on every page)
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });
}

/* ---------- Feature 4: Typing effect (Home page) ---------- */
var typingText = document.getElementById("typing-text");
if (typingText) {
  var phrases = ["Omron PLC Programmer", "HMI Designer", "Equipment Maintenance Technician"]; // array
  var phraseIndex = 0;   // which phrase
  var charIndex = 0;     // how many letters shown
  var deleting = false;  // typing or deleting?

  function typeEffect() {
    var current = phrases[phraseIndex];
    if (deleting == false) {
      charIndex++;                                   // add a letter
    } else {
      charIndex--;                                   // remove a letter
    }
    typingText.textContent = current.substring(0, charIndex);

    var delay = 100;
    if (deleting == false && charIndex == current.length) {
      deleting = true;  delay = 1500;                // pause when finished
    } else if (deleting == true && charIndex == 0) {
      deleting = false;
      phraseIndex++;                                 // next phrase
      if (phraseIndex == phrases.length) { phraseIndex = 0; }
      delay = 400;
    }
    setTimeout(typeEffect, delay);
  }
  typeEffect();
}

/* ---------- Feature 5: Greeting by time of day (Home) ---------- */
var greeting = document.getElementById("greeting");
if (greeting) {
  var hour = new Date().getHours();
  if (hour < 12) { greeting.textContent = "Good morning, I am"; }
  else if (hour < 18) { greeting.textContent = "Good afternoon, I am"; }
  else { greeting.textContent = "Good evening, I am"; }
}

/* ---------- Feature 6: Project filter (Projects page) ---------- */
var filterButtons = document.querySelectorAll(".filter-btn");
var projectCards = document.querySelectorAll(".project-card");

for (var i = 0; i < filterButtons.length; i++) {      // loop over buttons
  filterButtons[i].addEventListener("click", function () {
    var chosen = this.getAttribute("data-filter");    // e.g. "plc" or "all"
    for (var j = 0; j < projectCards.length; j++) {   // loop over cards
      var cat = projectCards[j].getAttribute("data-category");
      if (chosen == "all" || chosen == cat) {
        projectCards[j].classList.remove("hide");
      } else {
        projectCards[j].classList.add("hide");
      }
    }
  });
}

/* ---------- Feature 7: Contact form validation (COMPULSORY) ---------- */
var form = document.getElementById("contact-form");

// Show an error under a field and turn its border red
function showError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.add("invalid");
}
// Clear an error
function clearError(id) {
  document.getElementById(id + "-error").textContent = "";
  document.getElementById(id).classList.remove("invalid");
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();               // stop the page reloading
    var valid = true;                     // assume OK until a check fails

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();

    // Name: required, at least 2 characters
    if (name.length < 2) { showError("name", "Please enter your name (at least 2 letters)."); valid = false; }
    else { clearError("name"); }

    // Email: required, must contain @ and a dot after it
    var at = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    if (email == "") { showError("email", "Email is required."); valid = false; }
    else if (at < 1 || dot < at + 2 || dot == email.length - 1) {
      showError("email", "Enter a valid email, e.g. name@example.com."); valid = false;
    } else { clearError("email"); }

    // Subject: required
    if (subject == "") { showError("subject", "Subject is required."); valid = false; }
    else { clearError("subject"); }

    // Message: at least 10 characters
    if (message.length < 10) { showError("message", "Message must be at least 10 characters."); valid = false; }
    else { clearError("message"); }

    // All checks passed -> show success message and reset form
    if (valid == true) {
      document.getElementById("success-msg").classList.add("show");
      form.reset();
    } else {
      document.getElementById("success-msg").classList.remove("show");
    }
  });
}
