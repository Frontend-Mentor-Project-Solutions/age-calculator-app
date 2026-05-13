document.addEventListener("DOMContentLoaded", () => {
  const yearInput = document.querySelector('[name="year"]');
  yearInput.max = Temporal.Now.plainDateISO().year;
});

function submitDOB(e) {
  e.preventDefault();

  const form = document.querySelector("form");
  const formData = new FormData(form);

  const day = formData.get("day");
  const month = formData.get("month");
  const year = formData.get("year");

  let dob;

  try {
    dob = Temporal.PlainDate.from({ year, month, day }, { overflow: "reject" });
  } catch (error) {
    console.error(error);
    return;
  }
}

function handleNumericInput(e) {
  if (!isFinite(e.key)) {
    e.preventDefault();
  }
}

function validateField(e) {
  const input = e.target;

  input.setCustomValidity("");

  const message = getValidationMessage(input);

  input.setCustomValidity(message || "");
  displayValidationMessage(input);
}

function getValidationMessage(input) {
  const { validity, name } = input;

  if (validity.valueMissing) {
    return "This field is required";
  }

  if (validity.rangeOverflow) {
    if (name === "year") {
      return "Must be in the past";
    }

    return `Must be a valid ${name}`;
  }

  return;
}

function displayValidationMessage(input) {
  const validationMessageEl = document.getElementById(`${input.name}-error`);

  validationMessageEl.textContent = input.validationMessage;
}
