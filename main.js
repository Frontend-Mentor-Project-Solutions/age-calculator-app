import { getValidationMessage, getAge } from "./utils.js";

const form = document.querySelector("form");
const dayInput = document.querySelector('[name="day"]');
const monthInput = document.querySelector('[name="month"]');
const yearInput = document.querySelector('[name="year"]');

const yearOutput = document.querySelector('[data-output-for="year"]');
const monthOutput = document.querySelector('[data-output-for="month"]');
const dayOutput = document.querySelector('[data-output-for="day"]');

yearInput.max = Temporal.Now.plainDateISO().year;

form.addEventListener("submit", submitDOB);
document
  .querySelectorAll('input[type="number"]')
  .forEach((input) => input.addEventListener("input", validateField));

function submitDOB(e) {
  e.preventDefault();

  const form = document.querySelector("form");
  const formData = new FormData(form);

  const day = formData.get("day");
  const month = formData.get("month");
  const year = formData.get("year");

  //   const dob = { day, month, year };

  const dob = Temporal.PlainDate.from({ year, month, day });

  // validateDOB(dob);

  const age = getAge(dob);
  displayAge(age);
}

// DISPLAYING

function displayAge(age) {
  const { years, months, days } = age;

  yearOutput.textContent = years;
  monthOutput.textContent = months;
  dayOutput.textContent = days;
}

function displayValidationMessage(input) {
  const validationMessageEl = document.querySelector(
    `[data-error-for="${input.name}"]`,
  );

  validationMessageEl.textContent = input.validationMessage;
  input.setAttribute("data-valid", input.validity.valid);
}

// VALIDATION

function validateField(e) {
  const input = e.target;

  input.setCustomValidity("");

  const message = getValidationMessage(input);

  input.setCustomValidity(message);
  displayValidationMessage(input);
}
