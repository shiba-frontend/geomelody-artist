"use client";
// npm install react-drag-drop-files

import { useState, useRef, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
  FolderOpen,
  Music,
  Clock,
  Trash2,
  Play,
  Pause,
  ImageUp,
  FileText,
} from "lucide-react";
import {
  AUDIO_MAX_SIZE_MB,
  IMAGE_MAX_SIZE_MB,
  LYRICS_MAX_SIZE_MB,
  IMAGE_MIN_SIZE_KB,
  IMAGE_MIN_DIMENSION
} from "@/lib/validation/uploadFiles";
import { getImageDimensions } from "@/lib/validation/uploadFiles";


const AUDIO_TYPES = ["MP3", "WAV", "AAC", "FLAC"];

const REQUIREMENTS = [
  ["Format : MP3, WAV, AAC, FLAC", "Max size : 200 MB"],
  ["Bitrate : 320 kbps (recommended)", "Sample rate : 44.1KHz or higher"],
];

const REQUIREMENTSCOVER = [
  ["Format : JPG, JPEG, PNG, WEBP", "Max size : 2 MB"],
  ["Min size : 200 KB - 1000px X 1000px", "  No text overlay on cover picture"],
];

const REQUIREMENTSLYRICS = [
  ["Format : TXT, .PDF, DOC", "Max size : 20 MB"],
];

function getAudioDuration(file) {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);
    audio.preload = "metadata";
    audio.src = url;
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read audio duration"));
    };
  });
}

function formatDuration(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

const IMAGE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
const LYRICS_TYPES = ["TXT", "PDF", "DOC", "DOCX"];

// Shared uploader for Cover Image and Lyrics File — both are "one file,
// show a preview or filename, allow remove" with no special logic like
// the audio track has (no duration detection, no playback). Keeping this
// generic avoids writing the same dashed-box markup three times.
function SimpleFileField({
  label,
  required,
  file,
  onFile,
  onRemove,
  types,
  maxSizeMB,
  error,
  previewAsImage,
  helperText,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file || !previewAsImage) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, previewAsImage]);

  return (
    <div>

      {file ? (
        <div className="border-2 border-dashed border-emerald-500/50 rounded-2xl px-6 py-10 flex items-center justify-between bg-green-800">
          <div className="flex items-center gap-4 min-w-0">
            {previewAsImage && previewUrl ? (
              <img
                src={previewUrl}
                alt={file.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <FileText className="text-emerald-400" size={22} />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {file.name}
              </p>
              <p className="text-white/40 text-xs">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="text-white/50 hover:text-red-400 transition-colors flex-shrink-0"
            aria-label={`Remove ${label}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ) : (
        <FileUploader
          handleChange={onFile}
          name={label}
          types={types}
          maxSize={maxSizeMB}
          onTypeError={() => onFile(null, `Only ${types.join(", ")} allowed`)}
          onSizeError={() => onFile(null, `File is too large — max ${maxSizeMB}MB`)}
        >
          <div
            className={`border-2 border-dashed rounded-2xl px-6 py-10 flex items-center gap-4 cursor-pointer transition-colors bg-[#2D023D] ${
              error ? "border-red-500" : "border-[#900DA4] hover:border-amber-400/60"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              {previewAsImage ? (
                <ImageUp className="text-white/50" size={20} />
              ) : (
                <FileText className="text-white/50" size={20} />
              )}
            </div>
            <div>
              <p className="text-white/70 text-lg">
                  Drag or upload {label.toLowerCase()} <span className="text-red-500">*</span>
                </p>
             

            </div>
          </div>
        </FileUploader>
      )}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

export default function UploadFiles({ data, onChange, errors = {}, onFieldChange }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationError, setDurationError] = useState("");
  const audioRef = useRef(null);



  // Rebuild the object URL whenever the file changes (e.g. after a page
  // remount) and clean it up on unmount to avoid leaking memory.
  useEffect(() => {
    if (!data.audioFile) {
      setAudioUrl(null);
      return;
    }
    const url = URL.createObjectURL(data.audioFile);
    setAudioUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [data.audioFile]);

  function handleFieldChange(field, value) {
    const updated = { ...data, [field]: value };
    onChange(updated);
    onFieldChange?.(field, value, updated);
    return updated;
  }

  function updateFields(partial) {
    const updated = { ...data, ...partial };
    onChange(updated);
    Object.entries(partial).forEach(([field, value]) =>
      onFieldChange?.(field, value, updated)
    );
    return updated;
  }

  async function handleFile(file) {
    let merged = updateFields({ audioFile: file, duration: "" });
    setDurationError("");

    try {
      const seconds = await getAudioDuration(file);
      // Deliberately merge onto `merged` (the result of the call above),
      // not `data` — `data` is still the stale pre-upload closure value
      // even after this await, since React hasn't re-run this function
      // with fresh props. Using `merged` keeps audioFile in the object.
      merged = { ...merged, duration: formatDuration(seconds) };
      onChange(merged);
      onFieldChange?.("duration", merged.duration, merged);
    } catch {
      // Metadata read failed — leave duration blank so the user can type
      // it in manually instead of silently failing.
      setDurationError("Couldn't auto-detect duration — enter it manually.");
    }
  }

  function handleUploadRejected() {
    updateFields({ audioFile: null, duration: "" });
    setDurationError("");
  }

  function handleRemoveFile() {
    updateFields({ audioFile: null, duration: "" });
    setIsPlaying(false);
  }

  function togglePlayback() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  }

  // Splits/joins a single "duration" string ("MM:SS") into two number
  // inputs — easier to type into than one masked text field, but stored
  // back as one clean value for validation/submission.
  const [mins = "", secs = ""] = (data.duration || "").split(":");

  function updateDuration(newMins, newSecs) {
    handleFieldChange("duration", `${newMins}:${newSecs}`);
  }

  // Cover image and lyrics are independent single-field updates — no
  // multi-field merge needed here since only one key changes at a time,
  // unlike the audio+duration pair above.
  const [coverError, setCoverError] = useState("");
    const [checkingCover, setCheckingCover] = useState(false);


   async function handleCoverImage(file, rejectionReason) {
    if (rejectionReason) {
      setCoverError(rejectionReason);
      return;
    }

    setCoverError("");

    if (file.size < IMAGE_MIN_SIZE_KB * 1024) {
      setCoverError(`Image is too small — min ${IMAGE_MIN_SIZE_KB}KB`);
      return;
    }

    setCheckingCover(true);
    try {
      const { width, height } = await getImageDimensions(file);

      if (width !== height) {
        setCoverError("Cover image must be square (equal width and height)");
        return;
      }
      if (width < IMAGE_MIN_DIMENSION || height < IMAGE_MIN_DIMENSION) {
        setCoverError(`Minimum size is ${IMAGE_MIN_DIMENSION}x${IMAGE_MIN_DIMENSION}px`);
        return;
      }

      // Passed every check — accept the file and stash its dimensions
      // alongside it, so the final validateUploadFiles() pass at
      // Save & Next can re-verify without needing to re-decode the image.
      updateFields({
        coverImage: file,
        coverImageWidth: width,
        coverImageHeight: height,
      });
    } catch {
      setCoverError("Couldn't read this image — try a different file.");
    } finally {
      setCheckingCover(false);
    }
  }

  const [lyricsError, setLyricsError] = useState("");
  function handleLyricsFile(file, rejectionReason) {
    if (rejectionReason) {
      setLyricsError(rejectionReason);
      return;
    }
    setLyricsError("");
    handleFieldChange("lyricsFile", file);
  }

  return (
    <div>
      <h2 className="text-[24px] font-bold text-white mb-1">Upload Files</h2>
      <p className="text-white/70 mb-10">
        Add you audio file, cover art, any other additional file. Make sure
        they meet our format and quality requirements
      </p>

      <div className="grid grid-cols-[1fr_320px] gap-6 mb-5">
        {/* Audio uploader */}
        <div>
          {data.audioFile ? (
            <div className="border-2 border-dashed border-emerald-500/50 rounded-2xl px-6 py-8 flex items-center justify-between bg-green-800">
              <div className="flex items-center gap-4">
                {/* Play/pause control */}
                <button
                  onClick={togglePlayback}
                  className="w-14 h-14 rounded-xl bg-amber-400 hover:bg-amber-300 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={22} className="text-[#150a20]" />
                  ) : (
                    <Play size={22} className="text-[#150a20] ml-0.5" />
                  )}
                </button>

                <div>
                  <p className="text-white text-sm font-medium">
                    {data.audioFile.name}
                  </p>
                  <p className="text-white/40 text-xs">
                    {(data.audioFile.size / (1024 * 1024)).toFixed(1)} MB
                    {data.duration && ` · ${data.duration}`}
                  </p>
                </div>

                {/* Hidden native element actually doing the playback */}
                {audioUrl && (
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                )}
              </div>

              <button
                onClick={handleRemoveFile}
                className="text-white/50 hover:text-red-400 transition-colors cursor-pointer"
                aria-label="Remove file"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <FileUploader
              handleChange={handleFile}
              name="audio"
              types={AUDIO_TYPES}
              maxSize={AUDIO_MAX_SIZE_MB}
              onTypeError={handleUploadRejected}
              onSizeError={handleUploadRejected}
            >
              <div
                className={`border-2 border-dashed rounded-2xl px-6 py-8 flex items-center gap-4 cursor-pointer transition-colors bg-[#2D023D] ${
                  errors.audioFile
                    ? "border-red-500"
                    : "border-[#900DA4] hover:border-amber-400/60"
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                 <Music className="text-white/50" size={22} />
                </div>
                <p className="text-white/70 text-lg">
                  Drag or upload Music Track <span className="text-red-500">*</span>
                </p>
              </div>
            </FileUploader>
          )}
          {errors.audioFile && (
            <p className="text-red-400 text-xs mt-1.5">{errors.audioFile}</p>
          )}
        </div>

        {/* Track duration */}
        <div>
          <label className="block text-white text-sm mb-2">
            Track Duration <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex items-center bg-white/5 border rounded-xl px-4 py-3.5 ${
              errors.duration
                ? "border-red-500"
                : "border-white/10 focus-within:border-amber-400"
            }`}
          >
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={mins}
              onChange={(e) =>
                updateDuration(e.target.value.replace(/\D/g, ""), secs)
              }
              placeholder="MM"
              className="bg-transparent text-white placeholder-white/30 outline-none w-8 text-center"
            />
            <span className="text-white/40 mx-1">:</span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={secs}
              onChange={(e) =>
                updateDuration(mins, e.target.value.replace(/\D/g, ""))
              }
              placeholder="SS"
              className="bg-transparent text-white placeholder-white/30 outline-none w-8 text-center"
            />
            <div className="flex-1" />
            <Clock size={18} className="text-white/40" />
          </div>
          <p className="text-white/40 text-xs mt-2">
            {data.audioFile && data.duration
              ? "Auto-detected — edit if incorrect"
              : "Format MM:SS"}
          </p>
          {durationError && (
            <p className="text-amber-400 text-xs mt-1">{durationError}</p>
          )}
          {errors.duration && (
            <p className="text-red-400 text-xs mt-1.5">{errors.duration}</p>
          )}
        </div>
      </div>
      
      {/* Requirements */}
      <div className="mb-10">
        <h3 className="text-white font-semibold mb-3">Requirements</h3>
        <div className="space-y-2">
          {REQUIREMENTS.map((row, i) => (
            <div key={i} className="grid grid-cols-2 gap-6">
              {row.map((text) => (
                <p key={text} className="text-white/50 text-sm">
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Cover image + lyrics */}
      <div className="grid grid-cols-[1fr_320px] mb-6 gap-6">
        
        <SimpleFileField
          label="Cover Image"
          required
          file={data.coverImage}
          onFile={handleCoverImage}
           onRemove={() =>
            updateFields({
              coverImage: null,
              coverImageWidth: null,
              coverImageHeight: null,
            })
          }
          types={IMAGE_TYPES}
          maxSizeMB={IMAGE_MAX_SIZE_MB}
          error={errors.coverImage || coverError}
          previewAsImage
          helperText={`Prefer 3000x3000px · Max ${IMAGE_MAX_SIZE_MB}MB`}
        />
         <div className="mb-10">
            <h3 className="text-white font-semibold mb-2">Requirements</h3>
            <div className="">
              {REQUIREMENTSCOVER.map((row, i) => (
                <div key={i} className="mb-1">
                  {row.map((text) => (
                    <p key={text} className="text-white/50 text-sm">
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
        </div>  
        </div>
<div className="grid grid-cols-[1fr_320px] mb-6 gap-6">
        <SimpleFileField
        required
          label="Lyrics File"
          file={data.lyricsFile}
          onFile={handleLyricsFile}
          onRemove={() => handleFieldChange("lyricsFile", null)}
          types={LYRICS_TYPES}
          maxSizeMB={LYRICS_MAX_SIZE_MB} 
          error={errors.lyricsFile || lyricsError}         
          previewAsImage={false}
          helperText={`Optional · Max ${LYRICS_MAX_SIZE_MB}MB`}
        />
         <div className="mb-10">
            <h3 className="text-white font-semibold mb-2">Requirements</h3>
            <div className="">
              {REQUIREMENTSLYRICS.map((row, i) => (
                <div key={i} className="mb-1">
                  {row.map((text) => (
                    <p key={text} className="text-white/50 text-sm">
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
        </div>
      </div>

    </div>
  );
}
