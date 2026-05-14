import { getValidationMessage, getAge } from "./utils.js";

const form = document.querySelector("form");
const yearInput = document.querySelector('[name="year"]');

const yearOutput = document.querySelector('[data-output-for="year"]');
const monthOutput = document.querySelector('[data-output-for="month"]');
const dayOutput = document.querySelector('[data-output-for="day"]');

yearInput.max = Temporal.Now.plainDateISO().year;

form.addEventListener("submit", submitDOB);
document
  .querySelectorAll('input[type="number"]')
  .forEach((input) =>
    input.addEventListener("input", (e) => validateField(e.target)),
  );

function submitDOB(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const day = formData.get("day");
  const month = formData.get("month");
  const year = formData.get("year");

  const dob = { day, month, year };

  const isValid = validateDOB(dob);

  //const dob = Temporal.PlainDate.from({ year, month, day });

  if (isValid) {
    const validatedDOB = Temporal.PlainDate.from(dob);
    const age = getAge(validatedDOB);
    displayAge(age);
  }
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
}

function setDataAttribute(input) {
  input.setAttribute("data-valid", input.validity.valid);
}

// VALIDATION

function validateField(input) {
  input.setCustomValidity("");

  const message = getValidationMessage(input);

  input.setCustomValidity(message);
  displayValidationMessage(input);
  setDataAttribute(input);

  return input.checkValidity();
}

function validateDOB(dob) {
  let isValid = true;

  const dateInputs = document.querySelectorAll('input[type="number"]');
  const dateErrorEl = document.querySelector('[data-error-for="date"]');

  dateInputs.forEach((input) => validateField(input));

  if (![...dateInputs].every((input) => input.validity.valid)) {
    isValid = false;
    return isValid;
  }

  try {
    Temporal.PlainDate.from(dob, { overflow: "reject" });
    isValid = true;

    dateErrorEl.textContent = "";
  } catch {
    dateInputs.forEach((input) => input.setAttribute("data-valid", false));
    dateErrorEl.textContent = "Invalid date for the given month and/or year";

    isValid = false;
  }

  return isValid;
}
