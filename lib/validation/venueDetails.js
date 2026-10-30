

// lib/validation/venue.js

import { validatePhoneForCountry } from "./authvalidation";

// Moved out of the function body — no reason to rebuild the same regex
// on every single validation call.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DEFAULT_COUNTRY_ISO = "US";

// `.trim()` so a field containing only spaces counts as empty — plain
// `!value` treats "   " as a valid, filled-in value.
const isEmpty = (value) => !value || !String(value).trim();

export function validateVenueField(field, value, allData = {}) {
  switch (field) {
    case "eventDate":
      return isEmpty(value) ? "Event date is required" : "";
    case "eventStartTime":
      return isEmpty(value) ? "Event start time is required" : "";
    case "eventEndTime":
      return isEmpty(value) ? "Event end time is required" : "";
    case "venueName":
      return isEmpty(value) ? "Venue name is required" : "";
    // case "venueAddress":
    //   return isEmpty(value) ? "Venue address is required" : "";
    case "country":
      return isEmpty(value) ? "Country is required" : "";
    case "city":
      return isEmpty(value) ? "City is required" : "";
    case "venueType":
      return isEmpty(value) ? "Venue type is required" : "";
    case "contactPerson":
      return isEmpty(value) ? "Contact person is required" : "";

    // FIX: this used to be TWO separate `case "contactEmail"` blocks. A
    // switch only runs the first match, so the regex check in the second
    // one never executed. Now one case: required first, then format.
    case "contactEmail":
      if (isEmpty(value)) return "Contact email is required";
      return EMAIL_REGEX.test(value.trim()) ? "" : "Invalid email address";
case "contactPhone":
       return (
        validatePhoneForCountry(
          value,
          allData.contactCountryIso || DEFAULT_COUNTRY_ISO
        ).error || ""
      );
    case "contactDesignation":
      return isEmpty(value) ? "Contact designation is required" : "";

    default:
      return "";
  }
}

export function validateVenueDetails(data) {
  const fields = [
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "venueName",
    "country",
    "city",
    "venueType",
    "contactPerson",
    "contactEmail",
    "contactPhone",
    "contactDesignation",
    // "venueAddress",
  ];
  const errors = {};
  fields.forEach((field) => {
    const message = validateVenueField(field, data[field], data);
    if (message) errors[field] = message;
  });
  return errors;
}





