export const IMAGE_MAX_SIZE_MB = 2;

function exceedsSize(file, maxSizeMB) {
  return file.size > maxSizeMB * 1024 * 1024;
}

export function validateEventField(field, value, allData = {}) {
  switch (field) {
    case "eventName":
      return !value?.trim() ? "Event name is required" : "";
    case "eventType":
      return !value ? "Select a type" : "";
    case "eventCategory":
      return !value ? "Select a category" : "";
      case "eventImage":
         return !value ? "Upload a poster image" : "";   
     
    default:
      return "";
  }
}


export function validateEventDetails(data) {
  const fields = [
    "eventName",
    "eventType",
    "eventCategory",
    "eventImage",
  ];

  const errors = {};
  fields.forEach((field) => {
    const message = validateEventField(field, data[field], data);
    if (message) errors[field] = message;
  });

  return errors;
}


