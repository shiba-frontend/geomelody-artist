export function validateCopyrightField(field, value, allData = {}) {

  switch (field) {
    case "owncreate":
      return !value ? "Select who owns the rights" : "";

        case "artistmember": {        

      if (allData.owncreate === "collaborator") {
        const hasMembers = Array.isArray(value) && value.length > 0;
        return hasMembers ? "" : "Add at least one artist member";
      }
      return ""; // not applicable when owncreate is "own"
    }


    case "content": {
      const hasAtLeastOne = Array.isArray(value) && value.some((item) => item.ischeck);
      return hasAtLeastOne ? "" : "Select at least one option";
    }
    case "confirm":
      return value ? "" : "You must confirm before continuing";
    default:
      return "";
  }
}

export function validateCopyright(data) {
  const fields = ["owncreate", "content", "confirm", "artistmember"];
  const errors = {};
  fields.forEach((field) => {
    const message = validateCopyrightField(field, data[field], data);
    if (message) errors[field] = message;
  });
  return errors;
}



