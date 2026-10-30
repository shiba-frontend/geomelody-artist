// lib/validation/visibility.js

export function validateVisibilityField(field, value, allData = {}) {
  switch (field) {
    case "visibility":
      return !value ? "Select a visibility option" : "";
    case "scheduledAt":
      // only required when "Schedule" is the selected visibility
      if (allData.visibility === "schedule") {
        if (!value) return "Select a schedule date and time";
        if (new Date(value) < new Date()) {
          return "Scheduled time must be in the future";
        }
      }
      return "";
    default:
      return "";
  }
}

export function validateVisibility(data) {
  const fields = ["visibility", "scheduledAt"];
  const errors = {};
  fields.forEach((field) => {
    const message = validateVisibilityField(field, data[field], data);
    if (message) errors[field] = message;
  });
  return errors;
}
