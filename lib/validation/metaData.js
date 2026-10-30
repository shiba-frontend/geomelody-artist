// lib/validation/metaData.js

export const MIN_TAGS = 3;

export function validateMetaField(field, value) {
  switch (field) {
    case "tags": {
      const count = Array.isArray(value) ? value.length : 0;
      return count < MIN_TAGS ? `Add at least ${MIN_TAGS} tags` : "";
    }
    default:
      return "";
  }
}

export function validateMetaData(data) {
  const fields = ["tags"];
  const errors = {};
  fields.forEach((field) => {
    const message = validateMetaField(field, data[field]);
    if (message) errors[field] = message;
  });
  return errors;
}
