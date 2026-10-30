

export const AUDIO_MAX_SIZE_MB = 200;
export const IMAGE_MAX_SIZE_MB = 2;
export const LYRICS_MAX_SIZE_MB = 20;
export const IMAGE_MIN_SIZE_KB = 200;
export const IMAGE_MIN_DIMENSION = 1000;

function exceedsSize(file, maxSizeMB) {
  return file.size > maxSizeMB * 1024 * 1024;
}

export function validateUploadField(field, value) {
  switch (field) {
    case "audioFile":
      if (!value) return "Upload a music track";
     if (exceedsSize(value, AUDIO_MAX_SIZE_MB)) {
        return `File is too large — max ${AUDIO_MAX_SIZE_MB}MB`;
      }
       return "";

    case "duration": {
      if (!value || value === ":") return "Track duration is required";
      const match = /^(\d{1,2}):(\d{1,2})$/.exec(value);
      if (!match) return "Enter duration as MM:SS";
      const [, mm, ss] = match;
      if (Number(ss) > 59) return "Seconds must be 00–59";
      if (Number(mm) === 0 && Number(ss) === 0) return "Duration can't be 0:00";
      return "";
    }
    case "coverImage":
       if (!value) return "Upload a cover image";
      if (exceedsSize(value, IMAGE_MAX_SIZE_MB)) {
        return `File is too large — max ${IMAGE_MAX_SIZE_MB}MB`;
      }
      return "";
    case "lyricsFile":
       if (!value) return "Upload a lyrics file";
       if (value && exceedsSize(value, LYRICS_MAX_SIZE_MB)) {
        return `File is too large — max ${LYRICS_MAX_SIZE_MB}MB`;
      }
      return "";
    default:
      return "";
  }
}

export function validateUploadFiles(data) {
  const fields = ["audioFile", "duration", "coverImage", "lyricsFile"];
  const errors = {};
  fields.forEach((field) => {
    const message = validateUploadField(field, data[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image dimensions"));
    };

    img.src = url;
  });
}

