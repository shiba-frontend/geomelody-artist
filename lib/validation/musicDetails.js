
export function validateMusicField(field, value, allData = {}) {
  switch (field) {
    case "trackName":
      return !value?.trim() ? "Track name is required" : "";
    case "artist":
      return !value?.trim() ? "Artist name is required" : "";
    case "genre":
      return !value ? "Select a genre" : "";
    case "language":
      return !value ? "Select a language" : "";
      case "visibility":
      return !value ? "Choose any of one" : "";        
       case "releaseDate":
      if (allData.visibility === "scheduled") {
        return !value ? "Select a realease date" : "";
      }
      return "";

    
    
      case "description":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
}

// case "releaseDate":
//       if (!value) return "Release date is required";
//       if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
//         return "Release date can't be in the past";
//       }
//       return "";

export function validateMusicDetails(data) {
  const fields = [
    "trackName",
    "artist",
    "genre",
    "language",
    "visibility",
    "releaseDate",
    "releaseTime",
    "description"
  ];

  const errors = {};
  fields.forEach((field) => {
    const message = validateMusicField(field, data[field], data);
    if (message) errors[field] = message;
  });

  return errors;
}


