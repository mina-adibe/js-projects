const dateElement = document.getElementById("date-picker");
const countdownForm = document.getElementById("countdownForm");
const inputContainer = document.getElementById("input-container");

// countdown elements
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

// complete elements
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

const errorMsg = document.getElementById("error-message");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute("min", today);

// populate countdown / complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const mins = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // hide input
    inputContainer.hidden = true;
    // if the countdown has ended, show complete

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // populate countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${mins}`;
      timeElements[3].textContent = `${seconds}`;

      // show countdown in progress
      countdownEl.hidden = false;
      completeEl.hidden = true;
    }
  }, second);
}

// reset all values
function reset() {
  // hide countdown, show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // stop the countdown
  clearInterval(countdownActive);

  // reset values
  countdownTitle = "";
  countdownDate = "";

  localStorage.removeItem("countdown");

  // reset input
  countdownForm.reset();
}

//updateCountdown
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  console.log(savedCountdown);

  // check for valid date
  if (countdownDate === "") {
    // add error message inside errorMsg

    errorMsg.hidden = false;
    errorMsg.textContent = "Please select a date for the countdown.";
  } else {
    errorMsg.hidden = true;
    // get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }

  countdownValue = new Date(countdownDate).getTime();
}

// get countdown from local storage if available
function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// add submit event listener to countdownForm
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

dateElement.addEventListener("change", () => {
  if (dateElement.value !== "") {
    errorMsg.hidden = true;
  }
});

// on load, check local storage
restorePreviousCountdown();
