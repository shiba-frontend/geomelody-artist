import { CalendarDays, Check } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import AlbumEpSelector from "./AlbumEpSelector";

const GENRES = ["Pop", "Rock", "Hip-Hop", "Classical", "Electronic", "Folk"];
const LANGUAGES = ["English", "Hindi", "Bengali", "Spanish", "French"];
const RELEASE_TYPES = ["Single Track", "Extended Play (EP)", "Album"];

export default function MusicDetails({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {
  const [selected, setSelected] = useState(
    data.releaseDate ? new Date(data.releaseDate) : null,
  );
  const [open, setOpen] = useState(false);

  function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const today = new Date();
  const fromYear = today.getFullYear();
  const toYear = today.getFullYear();
  const maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + 30);

  const handleSelect = (date) => {
    setSelected(date);
    setOpen(false);
    onChange({ ...data, ["releaseDate"]: date });
    onFieldChange("releaseDate", date);
  };

  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
    onFieldChange(field, value);
  }

  return (
    <div>
      <h3 className="text-[24px] font-bold text-white mb-1">Music Details</h3>
      <p className="text-white/70 mb-5">Track, Artist, Genre, Language</p>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 mb-5">
        <div className="form-group">
          <label>
            Track Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.trackName}
            onChange={(e) => handleFieldChange("trackName", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.trackName
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            name="track"
            placeholder="Enter your track name"
          />
          {errors.trackName && (
            <p className="text-red-500 text-sm mt-1">{errors.trackName}</p>
          )}
        </div>
        <div className="form-group relative">
          <label>
            Artist Name <span className="text-red-500">*</span>
          </label>
          <input
            readOnly
            type="text"
            value={data.artist}
            onChange={(e) => handleFieldChange("artist", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.artist
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            name="artist"
            placeholder="Enter artist name"
          />
          <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full absolute right-4 top-12 transform ">
            <Check size={16} />
          </span>
          {errors.artist && (
            <p className="text-red-500 text-sm mt-1">{errors.artist}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            value={data.genre}
            onChange={(e) => handleFieldChange("genre", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.genre
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option value="">Select genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-400 text-xs mt-1.5">{errors.genre}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            Music Language <span className="text-red-500">*</span>
          </label>
          <select
            value={data.language}
            onChange={(e) => handleFieldChange("language", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.language
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option value="">Select language</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="text-red-400 text-xs mt-1.5">{errors.language}</p>
          )}
        </div>
        <div className="form-group relative" onMouseLeave={() => setOpen(false)}>
          <label>Release Date </label>

          <div
            className="w-full bg-[#2a1440] border border-white/20 rounded-xl px-4 py-4 text-white outline-none transition-colors cursor-pointer"
            onClick={() => setOpen((o) => !o)}
          >
            <h4 className="text-[16px]">
              {selected ? formatDate(selected) : "Select date"}
            </h4>
          </div>
          <CalendarDays
            color="#FFCD27"
            className="h-5 w-5 absolute right-3 top-13"
          />

          {open && (
            <div className="dob-panel w-full">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                defaultMonth={today} // always opens on the current month/year
                captionLayout="dropdown"
                startMonth={new Date(fromYear, 0)}
                endMonth={maxDate}
                 disabled={{
                  before: today,
                  after: maxDate,
                }}
                className="dob-daypicker"
              />
            </div>
          )}
           <h6 className="text-[12px] text-white/50 mt-1">You can Schedule Now or later for release</h6>
        </div>
         <div className="form-group">
          <label>Release Type <span className="text-red-500">*</span></label>
          <select
            value={data.releaseType}
            onChange={(e) => handleFieldChange("releaseType", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.releaseType
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option value="">Select type</option>
            {RELEASE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.releaseType && (
            <p className="text-red-400 text-xs mt-1.5">{errors.releaseType}</p>
          )}
        </div>
      </div>
       <div className="form-group">
        {(data.releaseType === "EP" || data.releaseType === "Album") && (
          <AlbumEpSelector
            releaseType={data.releaseType}
            fieldName={data.releaseType === "Album" ? "albumId" : "epId"}
            selectedId={data.releaseType === "Album" ? data.albumId : data.epId}
            onSelect={(id) =>
              handleFieldChange(data.releaseType === "Album" ? "albumId" : "epId", id)
            }
            error={data.releaseType === "Album" ? errors.albumId : errors.epId}
          />
        )}
        </div>
      <div className="form-group">
        <label className="block text-white/70 text-sm mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          rows={4}
          placeholder="What's this track about?"
          className="w-full bg-transparent border border-white/20 focus:border-amber-400 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors resize-none"
        />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>
        )}
      </div>
    </div>
  );
}
