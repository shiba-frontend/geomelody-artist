"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDays, Check, X } from "lucide-react";
import { MIN_TAGS } from "@/lib/validation/metaData";
import { DayPicker } from "react-day-picker";
import moment from "moment/moment";


// A reasonable starter set of genre/mood/discovery tags. In a real app
// this would likely come from an API (trending tags, genre taxonomy, etc)
// — kept as a static list here so the component works standalone.
const SUGGESTED_TAGS = [
  "Happy",
  "Romantic",
  "Sad",
  "Party",
  "Workout",
  "Sleep",
  "Relax",
  "Inspirational",
  "Heartbreak",
  "Rainy Day",
  "Nostalgic",
  "pop",
  "rock",
  "hiphop",
  "romantic",
  "sad",
  "party",
  "chill",
  "workout",
  "indie",
  "love",
  "electronic",
  "acoustic",
  "remix",
  "viral",
  "trending",
  "newrelease",
  "summer",
  "throwback",
  "lofi",
  "bollywood",
  "devotional",
  "wedding",
  "breakup",
  "motivational",
  "instrumental",
];

export default function MetaData({
  data,
  musicDetailsdata,
  onChange,
  errors = {},
  onFieldChange,
}) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
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

  console.log("=====", data);

  const handleSelect = (date) => {
    setSelected(date);
    setOpen(false);
    onChange({ ...data, ["releaseDate"]: date });
    onFieldChange("releaseDate", date);
  };

  const tags = data.tags || [];

  // Close the suggestion dropdown when clicking anywhere outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = SUGGESTED_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(tag),
  );

  function handleFieldChange(field, value) {
    const updated = { ...data, [field]: value };
    onChange(updated);
    onFieldChange?.(field, value, updated);
  }

  function addTag(rawTag) {
    const tag = rawTag.trim().toLowerCase().replace(/\s+/g, "");
    if (!tag) return;
    if (tags.includes(tag)) {
      setInputValue("");
      return; // no duplicates
    }
    handleFieldChange("tags", [...tags, tag]);
    setInputValue("");
    setShowSuggestions(false);
  }

  function removeTag(tagToRemove) {
    handleFieldChange(
      "tags",
      tags.filter((t) => t !== tagToRemove),
    );
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      // Backspace on an empty input removes the last tag — standard
      // tag-input UX so users don't have to reach for the small × button.
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div>
      <h2 className="text-[24px] font-bold text-white mb-1">Meta data</h2>
      <p className="text-white/70 mb-5">
        Add meta for your listeners for your music
      </p>

      <div className="flex gap-3">
        <div className="w-2/3 form-group">
          <label className="mb-0">
            Track tags <span className="text-red-500">*</span>
          </label>
          <p className="text-white/40 text-sm mb-3">
            Add minimum {MIN_TAGS} tags for for music
          </p>

          <div
            ref={containerRef}
            className={`relative rounded-2xl bg-white/5 border p-4 min-h-[6rem] ${
              errors.tags ? "border-red-500" : "border-white/10"
            }`}
          >
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 bg-[#900DA4] text-white text-sm px-4 py-2 rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove ${tag}`}
                    className="hover:text-white/70 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={
                  tags.length === 0 ? "Type a tag and press Enter" : ""
                }
                className="bg-transparent text-white placeholder-white/30 outline-none flex-1 min-w-[120px] py-2"
              />
            </div>

            {/* Autosuggestion dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute left-4 right-4 top-full mt-2 bg-[#2a1440]   border border-white/10 rounded-xl  shadow-lg z-10 h-[calc(100vh-600px)] scroll-smooth overflow-y-auto scrollbar-thin scrollbar-track-[#411753] scrollbar-thumb-amber-500">
                {filteredSuggestions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-white/30 text-xs">
              {tags.length}/{MIN_TAGS}+ tags added
            </p>
            {errors.tags && (
              <p className="text-red-400 text-xs">{errors.tags}</p>
            )}
          </div>
        </div>
        <div className="w-1/3">
          <div
            className="form-group relative mt-8.5">
            <label>Release Information</label>
            <div>
              {musicDetailsdata.visibility == 'private' ?
              <h5><b>Private</b> — Only visible to you; hidden from listeners.</h5>  
              :
               musicDetailsdata.visibility == 'public' ?
               <h5><b>Release date:</b> {moment(new Date()).format('MMMM Do YYYY')}</h5>
               :
               <>
               <h5><b>Release date & time:</b> {moment(musicDetailsdata.releaseDate).format('MMMM Do YYYY, h:mm A')}</h5>
               </>
            }
            </div>
          </div>
        </div>
      </div>


           



            <h4 className="text-[20px] font-bold text-white mb-3">Track identifier</h4>
             <div className="flex gap-10 items-center">
              <div className="form-group w-1/3">
                 <label>
                    ISRC code <span className="text-red-500">*</span>
                  </label>
                  <input
                  readOnly
                    type="text"
                    value={data.isrccode}
                    onChange={(e) => handleFieldChange("isrccode", e.target.value)}
                    className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
                      errors.isrccode
                        ? "border-red-500"
                        : "border-white/20 focus:border-amber-400"
                    }`}
                    name="track"
                    placeholder="AA-ABC-00-00000"
                  />
                  <h6 className="text-[12px] text-white/50 mt-1">
              A unique code fo your music
            </h6>
              </div>
              <div className="flex  gap-3 items-start w-2/3">
                    <img src="/shield.png" />
                    <div>
                      <h4 className="text-[18px] leading-none mb-1">
                        Why is this important?
                      </h4>
                      <h5 className="text-white/50 text-sm">
                       Copyright information helps us protect your music and ensures you get paid correctly
                      </h5>
                    </div>
                  </div>
            </div>

            <h4 className="text-[20px] font-bold text-white mb-3">Release Barcode</h4>
             <div className="flex gap-10 items-center">
              <div className="form-group w-1/3">
                 <label>
                    UPC / EAN code <span className="text-red-500">*</span>
                  </label>
                  <input
                  readOnly
                    type="text"
                    value={data.eancode}
                    onChange={(e) => handleFieldChange("eancode", e.target.value)}
                    className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
                      errors.eancode
                        ? "border-red-500"
                        : "border-white/20 focus:border-amber-400"
                    }`}
                    name="track"
                    placeholder="Enter your code"
                  />
                  <h6 className="text-[12px] text-white/50 mt-1">
              Format 12-13 digits
            </h6>
              </div>
              <div className="flex  gap-3 items-start w-2/3">
                    <img src="/shield.png" />
                    <div>
                      <h4 className="text-[18px] leading-none mb-1">
                        Why is this important?
                      </h4>
                      <h5 className="text-white/50 text-sm">
                       Copyright information helps us protect your music and ensures you get paid correctly
                      </h5>
                    </div>
                  </div>
            </div>         

    </div>
  );
}
