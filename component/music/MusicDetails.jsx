import { CalendarDays, Check } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const GENRES = ["Pop", "Rock", "Hip-Hop", "Classical", "Electronic", "Folk"];
const LANGUAGES = ["English", "Hindi", "Bengali", "Spanish", "French"];


export default function MusicDetails({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {



  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);



  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
    onFieldChange(field, value);
  }

  return (
    <div>
      <h3 className="text-[24px] font-bold text-white mb-1">Music Details</h3>
      <p className="text-white/70 mb-5">Track, Artist, Genre, Language</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
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

      </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mb-5 mt-3">
            <div className="">
        <label>
          Select Visibility <span className="text-red-500">*</span>
        </label>
        <h5 className="text-[12px] text-white/50 mb-4">
          Choose when to publish and who can your track
        </h5>
        <div className="flex gap-3 mb-4 cursor-pointer" onClick={()=>handleFieldChange("visibility", 'public')}>
          <div className={`h-7 w-7 rounded-full  ${data.visibility === "public" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
          >
            
          </div>
          <div>
              <h4 className="leading-none">Public</h4>
              <h5 className="text-[12px] text-white/50">
                Available to all listeners immediately after publishing
              </h5>
            </div>
        </div>
        <div className="flex gap-3 mb-4 cursor-pointer" onClick={()=>handleFieldChange("visibility", 'private')}>
          <div
            className={`h-7 w-7 rounded-full  ${data.visibility === "private" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
          >
            
          </div>
          <div>
              <h4 className="leading-none">Private</h4>
              <h5 className="text-[12px] text-white/50">
                Only visible to you; hidden from listeners
              </h5>
            </div>
        </div>
        <div className="flex gap-3 mb-4 cursor-pointer" onClick={()=>handleFieldChange("visibility", 'scheduled')}>
          <div
            className={`h-7 w-7 rounded-full  ${data.visibility === "scheduled" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
          >
            
          </div>
          <div>
              <h4 className="leading-none">Scheduled</h4>
              <h5 className="text-[12px] text-white/50">
               Automatically published on your selected date and time
              </h5>
            </div>
        </div>
         {errors.visibility && (
          <p className="text-red-400 text-xs mt-1.5">{errors.visibility}</p>
        )}
      </div>

    {data.visibility === "scheduled" && 
    <div className="flex gap-4">
         <div
          className="form-group relative flex-1"
         
        >
          <label>Release Date & Time  <span className="text-red-500">*</span></label>
          <DatePicker
            minDate={today}
            maxDate={maxDate}
            selected={data.releaseDate}
            onChange={(date)=>handleFieldChange("releaseDate", date)} 
            showTimeSelect
            dateFormat="MM/dd/yyyy h:mm aa"
            isClearable
            placeholderText="Select realease date & time"
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.releaseDate
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          />

          

           {errors.releaseDate && (
          <p className="text-red-400 text-xs mt-1.5">{errors.releaseDate}</p>
        )}
         
        </div>


    </div>
    }




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
