// lib/validation/ticketing.js

// Single source of truth for the option lists — imported by the component
// too, so the dropdowns and the validator can never disagree.
export const WRISTBAND_ENTRY = "Wrist Band";
export const ENTRY_WITH_OPTIONS = [WRISTBAND_ENTRY, "QR Code"]; // edit to match your real entry methods
export const WRISTBAND_COLORS = [
  "Yellow",
  "Green",
  "Red",
  "Blue",
  "Pink",
  "Orange",
  "Purple",
  "White",
];

// Validates the "add a category" row before it becomes a saved ticket.
// `existing` is the list already added, needed for the duplicate checks.
export function validateTicketDraft(draft, existing = []) {
  const errors = {};

  const category = draft.category.trim();
  if (!category) {
    errors.category = "Category is required";
  } else if (
    existing.some((t) => t.category.toLowerCase() === category.toLowerCase())
  ) {
    errors.category = "Category already added";
  }

  if (draft.price === "") {
    errors.price = "Price is required";
  } else {
    const price = Number(draft.price);
    if (!Number.isFinite(price) || price < 0) {
      errors.price = "Enter a valid price"; // 0 is allowed (free tickets)
    }
  }

  if (draft.quantity === "") {
    errors.quantity = "Quantity is required";
  } else {
    const quantity = Number(draft.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      errors.quantity = "Must be at least 1";
    }
  }

  if (!draft.entryWith) {
    errors.entryWith = "Select entry type";
  }

  if (draft.entryWith === WRISTBAND_ENTRY) {
    if (!draft.wristbandColor) {
      errors.wristbandColor = "Select a color";
    } else {
      // Two categories sharing a wristband color would defeat the point of
      // color-coding at the gate.
      const clash = existing.find(
        (t) =>
          t.entryWith === WRISTBAND_ENTRY &&
          t.wristbandColor === draft.wristbandColor
      );
      if (clash) {
        errors.wristbandColor = `Already used by ${clash.category}`;
      }
    }
  }

  return errors;
}

// Step-level validation: at least one category must exist to continue.
export function validateTicketingField(field, value) {
  switch (field) {
    case "tickets":
      return Array.isArray(value) && value.length > 0
        ? ""
        : "Add at least one ticket category";
    default:
      return "";
  }
}

export function validateTicketing(data) {
  
  const errors = {};
  const message = validateTicketingField("tickets", data.tickets);
  if (message) errors.tickets = message;
  return errors;
}
