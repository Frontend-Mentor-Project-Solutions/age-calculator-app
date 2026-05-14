export function getValidationMessage(input) {
  const { validity, name } = input;
  let validationMessage = "";

  if (validity.badInput) {
    validationMessage = `${name} must be a number`;
  } else if (validity.rangeOverflow) {
    if (name === "year") {
      validationMessage = "Must be in the past";
    } else {
      validationMessage = `${name} must be below ${input.max}`;
    }
  } else if (validity.rangeUnderflow) {
    validationMessage = `${name} must be above ${input.min}`;
  } else if (validity.valueMissing) {
    validationMessage = `This field is required`;
  } else {
    validationMessage = "";
  }

  return validationMessage;
}

export function getAge(dob) {
  const now = Temporal.Now.plainDateISO();
  const duration = now.since(dob, { largestUnit: "year" });

  const age = {
    years: duration.years,
    months: duration.months,
    days: duration.days,
  };

  return age;
}
