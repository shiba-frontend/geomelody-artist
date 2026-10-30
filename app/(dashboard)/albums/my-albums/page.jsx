"use client";
import ModalSide from "@/component/ModalSide";
import {
  CalendarDays,
  Check,
  ImageUp,
  MoreVertical,
  Music,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "react-drag-drop-files";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TrackCard from "@/component/music/TrackCard";
import { INITIAL_TRACKS } from "@/lib/dummyTrack";

const TABS = ["Public", "Private", "Scheduled"];
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

const ALBUMS = [
  {
    id: 1,
    name: "Album 1",
    tracks: 0,
    published_date: "",
  },
  {
    id: 2,
    name: "Album 2",
    tracks: 2,
    published_date: "12 sep 2026 | 00:30 am",
  },
];

function ColumnHeader({ label }) {
  return (
    <div className="flex items-center gap-2 text-white/50 text-sm">{label}</div>
  );
}

export default function myAlbums() {
  const [activeTab, setActiveTab] = useState("Public");
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const [addAlbumModal, setAddAlbumModal] = useState(false);
  const [addtrackModal, setAddtrackModal] = useState(false);
  const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
  const [albumerrors, setAlbumerrors] = useState({});
  const [rawFile, setRawFile] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [albumName, setAlbumName] = useState("");
  const [releaseType, setReleaseType] = useState("Public");
  const [releaseDate, setReleaseDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tags, setTags] = useState([]);
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [selectedIds, setSelectedIds] = useState([]);

  const containerRef = useRef(null);
  const MIN_TAGS = 3;
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  function addTag(rawTag) {
    const tag = rawTag.trim().toLowerCase().replace(/\s+/g, "");
    if (!tag) return;
    if (tags.includes(tag)) {
      setInputValue("");
      return; // no duplicates
    }
    setTags([...tags, tag]);
    setInputValue("");
    setShowSuggestions(false);
    console.log(tags.length);
    if (tags.length + 1 === MIN_TAGS) {
      setAlbumerrors((prev) => ({ ...prev, tags: "" }));
    }
  }

  function removeTag(tagToRemove) {
    setTags(tags.filter((t) => t !== tagToRemove));
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

  const handleFile = (file) => {
    setAlbumerrors((prev) => ({ ...prev, cover: "" }));
    setRawFile(file);
    setRawImage(URL.createObjectURL(file));
  };

  const handleTypeError = () => {
    setAlbumerrors(`Please upload a ${FILE_TYPES.join(", ")} file.`);
  };

  function ReleaseDateHandle(e) {
    setReleaseDate(e);
    setAlbumerrors((prev) => ({ ...prev, releaseDate: "" }));
  }

  function resetForm() {
    setAddAlbumModal(false);
  }

  function handleAlbumCreate() {
    const count = tags.length;
    const newErrors = {};
    if (!albumName.trim()) newErrors.albumName = `Name is required`;

    if (releaseType === "Scheduled") {
      if (!releaseDate)
        newErrors.releaseDate = "Release date & time is required";
    }

    if (count < MIN_TAGS) {
      newErrors.tags = `Add at least ${MIN_TAGS} tags`;
    }
    if (!rawFile) newErrors.cover = "Album  image is required";

    setAlbumerrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    resetForm();
    setAddtrackModal(true);
  }

  function toggleSelect(trackId) {
    setSelectedIds(
      (prev) =>
        prev.includes(trackId)
          ? prev.filter((id) => id !== trackId) // uncheck
          : [...prev, trackId], // check
    );
  }

  return (
    <div className="rounded-3xl  border border-white/5 bg-card-gradient">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div className="flex bg-black/20 rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? "bg-[#900DA4] text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="bg-white/10 rounded-[30px] px-4 py-2 cursor-pointer flex items-center gap-1"
          onClick={() => {
            setAddAlbumModal(true);
          }}
        >
          <Plus /> Create Album
        </button>
      </div>

      <div className="grid grid-cols-5 gap-5 py-5 px-5">
        {ALBUMS.map((items) => {
          return (
            <div className="relative bg-black/30 rounded-[10px]" key={items.id}>
              <div className="absolute top-4 right-4" ref={menuRef}>
                <button
                  onClick={() =>
                    setMenuOpen((prev) => (prev === items.id ? null : items.id))
                  }
                  className="text-white/50 hover:text-white transition-colors cursor-pointer"
                  aria-label="Member options"
                >
                  <MoreVertical size={18} />
                </button>

                {menuOpen == items.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-[#2a1440] border border-white/10 rounded-xl overflow-hidden shadow-lg z-10">
                    <button
                      onClick={() => {
                        console.log("hjk");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        console.log("hjk");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                )}
              </div>
              <a href="/albums/album-details/1">
                <img
                  src="/Registration.jpg"
                  className="w-full h-60 rounded-[10px]"
                />
                <div className="p-3">
                  <h4>{items.name}</h4>
                  <h5 className="flex items-center text-sm gap-1 my-2">
                    <Music size={15} className="text-amber-400" />
                    {items.tracks} Tracks
                  </h5>
                  <h5 className="flex items-center text-sm gap-1">
                    <CalendarDays size={15} className="text-white/50" />
                    Publish Date: {items.published_date}
                  </h5>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <ModalSide
        isOpen={addAlbumModal}
        onClose={() => setAddAlbumModal(false)}
        closeOnBackdrop={false}
        size="md"
      >
        <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
          <h4 className="text-[18px] font-medium">Add Album</h4>
          <button onClick={() => resetForm()} className="cursor-pointer">
            <X size={22} />
          </button>
        </div>
        <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          <div>
            <div className="form-group">
              <label>
                Album Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={albumName}
                onChange={(e) => {
                  setAlbumName(e.target.value);
                  if (e.target.value.trim()) {
                    setAlbumerrors((prev) => ({ ...prev, albumName: "" }));
                  }
                }}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
                  albumerrors.albumName
                    ? "border-red-500"
                    : "border-white/20 focus:border-amber-400"
                }`}
                placeholder="Enter album name"
              />
              {albumerrors.albumName && (
                <p className="text-red-400 text-xs mt-1.5">
                  {albumerrors.albumName}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>
                Select Visibility <span className="text-red-500">*</span>
              </label>

              <div
                className="flex gap-3 mb-4 cursor-pointer items-center"
                onClick={() => setReleaseType("Public")}
              >
                <div
                  className={`h-7 w-7 rounded-full  ${releaseType === "Public" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
                ></div>
                <div>
                  <h4 className="leading-none">Public</h4>
                  <h5 className="text-[12px] text-white/50">
                    Available to all listeners immediately after publishing
                  </h5>
                </div>
              </div>
              <div
                className="flex gap-3 mb-4 cursor-pointer items-center"
                onClick={() => setReleaseType("Private")}
              >
                <div
                  className={`h-7 w-7 rounded-full  ${releaseType === "Private" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
                ></div>
                <div>
                  <h4 className="leading-none">Private</h4>
                  <h5 className="text-[12px] text-white/50">
                    Only visible to you; hidden from listeners
                  </h5>
                </div>
              </div>
              <div
                className="flex gap-3 mb-4 cursor-pointer items-center"
                onClick={() => setReleaseType("Scheduled")}
              >
                <div
                  className={`h-7 w-7 rounded-full  ${releaseType === "Scheduled" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
                ></div>
                <div>
                  <h4 className="leading-none">Scheduled</h4>
                  <h5 className="text-[12px] text-white/50">
                    Automatically published on your selected date and time
                  </h5>
                </div>
              </div>
            </div>
            {releaseType === "Scheduled" && (
              <div className="flex gap-4">
                <div className="form-group relative flex-1">
                  <label>
                    Release Date & Time <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    minDate={today}
                    maxDate={maxDate}
                    selected={releaseDate}
                    onChange={ReleaseDateHandle}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy h:mm aa"
                    isClearable
                    placeholderText="Select realease date & time"
                    className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
                      albumerrors.releaseDate
                        ? "border-red-500"
                        : "border-white/20 focus:border-amber-400"
                    }`}
                  />

                  {albumerrors.releaseDate && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {albumerrors.releaseDate}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="form-group">
              <label className="mb-0">
                Album tags <span className="text-red-500">*</span>
              </label>
              <p className="text-white/40 text-sm mb-3">
                Add minimum {MIN_TAGS} tags for for music
              </p>

              <div
                ref={containerRef}
                className={`relative rounded-2xl bg-white/5 border p-4 min-h-[6rem] ${
                  albumerrors.tags ? "border-red-500" : "border-white/10"
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
                {albumerrors.tags && (
                  <p className="text-red-400 text-xs">{albumerrors.tags}</p>
                )}
              </div>
            </div>
            <div className="form-group">
              {rawImage ? (
                <div className="relative w-full overflow-hidden mx-auto">
                  <img
                    src={rawImage}
                    alt="Uploaded"
                    className="w-35 h-35 object-cover rounded-[10px]"
                  />
                  <button
                    onClick={() => setRawImage(null)}
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
                      albumerrors.cover
                        ? "border-red-500"
                        : "border-[#900DA4] hover:border-amber-400/60"
                    }`}
                  >
                    <ImageUp className="text-white/30" size={80} />
                    <p className="text-white/70 text-md text-center font-bold">
                      Drag or upload album picture
                    </p>
                    <p className="text-white/70 text-sm text-center">
                      Prefer Size 500X500 | Max size 1mb
                    </p>
                    <p className="text-white/70 text-xs">
                      {FILE_TYPES.join(", ")}
                    </p>
                  </div>
                </FileUploader>
              )}
              {albumerrors.cover && (
                <p className="text-red-400 text-xs mt-1.5">
                  {albumerrors.cover}
                </p>
              )}
            </div>
          </div>
          <div className="mt-auto self-end flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#ffcd27] rounded-full transition-colors text-[17px] cursor-pointer px-5 py-3 text-black font-medium"
              onClick={handleAlbumCreate}
            >
              Save & Continue
            </motion.button>
          </div>
        </div>
      </ModalSide>

      <ModalSide
        isOpen={addtrackModal}
        onClose={() => setAddtrackModal(false)}
        closeOnBackdrop={false}
        size="lg"
      >
        <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
          <h4 className="text-[18px] font-medium">Add Track</h4>
          <button
            onClick={() => setAddtrackModal(false)}
            className="cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>
        <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          <div>
            <div className="grid grid-cols-[40px_1.4fr_1fr_1fr_0.8fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/10">
              <span />
              <ColumnHeader label="Track Details" />
              <ColumnHeader label="Play Times" />
              <ColumnHeader label="Total Likes" />
              <ColumnHeader label="Genre" />
              <ColumnHeader label="Release On" />
              <ColumnHeader label="Status" />
            </div>

            {tracks.map((track, i) => {
              return (
                <div
                  key={track.id}
                  className={`grid grid-cols-[40px_1.4fr_1fr_1fr_0.8fr_1fr_1fr] gap-4 items-center px-6 py-4 ${
                    i % 2 === 1 ? "bg-white/[0.03]" : ""
                  } border-b border-white/5 last:border-b-0`}
                >
                  <TrackCard
                    track={track}
                    checked={selectedIds.includes(track.id)}
                    onCheck={toggleSelect}
                      ischeckbox={true}
                    action={false}
                  />
                </div>
              );
            })}

            {selectedIds.length > 0 && (
              <div className="flex items-center justify-between px-6 py-3 bg-white/5 text-white text-sm">
                <span>{selectedIds.length} selected</span>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Clear selection
                </button>
              </div>
            )}

            {releaseType !== "Public" && (
              <div className="flex gap-3 mt-10  cursor-pointer">
                <div className="rounded-[2px] border border-[#fff] w-5 h-5"></div>
                <div>
                  <h5 className="leading-none mb-1">
                    Skip for now i will add track later
                  </h5>
                  <h6 className="text-sm text-white/50">I agree to continue</h6>
                </div>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
          >
            Save & Update
          </motion.button>
        </div>
      </ModalSide>
    </div>
  );
}
