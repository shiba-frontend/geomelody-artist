import { IMAGE_MAX_SIZE_MB } from "@/lib/validation/eventDetails";
import { Check, ImageUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const eventCategory = ["Pop", "Rock", "Hip-Hop", "Classical", "Electronic", "Folk"];
const eventType = [{
  id:1,
  title:'Fan Meet / Artist Meet & Greet',
  description:'An intimate gathering where fans can meet their favorite artists.'
},

{
  id:2,
  title:'Concert / Live Performance',
  description:'A live musical performance by an artist or band, typically in front of an audience.'
},
{
  id:3,
  title:'Festival / Music Festival',
  description:'A large-scale event featuring multiple artists, often spanning several days.'
},
{
  id:4,
  title:'Album Release / Listening Party',
  description:'An event celebrating the release of a new album, often with a listening session.'
},
{
  id:5,
  title:'Charity / Benefit Concert',
  description:'A concert organized to raise funds for a charitable cause.'
},
{
  id:6,
  title:'Single Release / Online Event',
  description:'An event celebrating the release of a new single, often with an online listening session.'
},
{
  id:7,
  title:'Live band performance / Jam Session',
  description:'A live performance by a band, often featuring improvisation and collaboration among musicians.'
}


]

export default function EventDetails({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {
  const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
  const [rawImage, setRawImage] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFile = (file) => {

    console.log(file.size > IMAGE_MAX_SIZE_MB * 1024 * 1024)

    if (file.size > IMAGE_MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`Image is too large — max ${IMAGE_MAX_SIZE_MB}MB`);
      return;
    }

    onChange({ ...data, ["eventImage"]: file });
    onFieldChange("eventImage", file);
    setRawImage(URL.createObjectURL(file));
    setFileError("");
  };

  function RemoveImageHandle(){
    onChange({ ...data, ["eventImage"]: '' });
    onFieldChange("eventImage", '');
    setRawImage(null)
  }

  const handleTypeError = () => {
    setFileError(`Please upload a ${FILE_TYPES.join(", ")} file.`);
  };

  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
    onFieldChange(field, value);
  }

  return (
    <div>
      <h3 className="text-[24px] font-bold text-white mb-1">Event Details</h3>
      <p className="text-white/70 mb-5">Event name, event type, category</p>
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-3">
        <div className="form-group">
          <label>
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.eventName}
            onChange={(e) => handleFieldChange("eventName", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.eventName
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            name="track"
            placeholder="Enter event name"
          />
          {errors.eventName && (
            <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mb-4">
        <div className="form-group">
          <label>
            Event Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.eventType}
            onChange={(e) => handleFieldChange("eventType", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.eventType
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option value="">Select type</option>
            {eventType.map((g) => (
              <option key={g.id} value={g}>
                {g.title}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-red-400 text-xs mt-1.5">{errors.eventType}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            Event Category <span className="text-red-500">*</span>
          </label>
          <select
            value={data.eventCategory}
            onChange={(e) => handleFieldChange("eventCategory", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.eventCategory
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option value="">Select category</option>
            {eventCategory.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.eventCategory && (
            <p className="text-red-400 text-xs mt-1.5">
              {errors.eventCategory}
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        {rawImage ? (
          <div className="relative w-full overflow-hidden mx-auto">
            <img
              src={rawImage}
              alt="Uploaded"
              className="w-120 h-120 object-cover rounded-[10px]"
            />
            <button
              onClick={() => RemoveImageHandle()}
              className="absolute top-2 right-2 bg-white rounded-full p-2 text-white cursor-pointer shadow-md"
              aria-label="Remove image"
            >
              <Trash2 size={20} color="red" />
            </button>
          </div>
        ) : (
          <FileUploader
            handleChange={handleFile}
            name="file"
            types={FILE_TYPES}
            onTypeError={handleTypeError}
          >
            <div
              className={`border-2 border-dashed rounded-2xl py-10 px-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-[#2D023D] ${
                errors.eventImage
                  ? "border-red-500"
                  : "border-[#900DA4] hover:border-amber-400/60"
              }`}
            >
              <ImageUp className="text-white/30" size={80} />
              <p className="text-white/70 text-md text-center font-bold">
                Drag or upload event poster
              </p>
              <p className="text-white/70 text-sm text-center">
                Prefer Size 500X500 | Max size 1mb
              </p>
              <p className="text-white/70 text-xs">{FILE_TYPES.join(", ")}</p>
            </div>
          </FileUploader>
        )}
        {errors.eventImage && (
          <p className="text-red-400 text-xs mt-1.5">{errors.eventImage}</p>
        )}

        {fileError && (
          <p className="text-red-400 text-xs mt-1.5">{fileError}</p>
        )}
      </div>
    </div>
  );
}
