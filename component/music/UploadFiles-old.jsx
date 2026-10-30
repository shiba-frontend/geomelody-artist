import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function UploadFiles() {

const fileTypes = [
  "MP3",
  "WAV",
  "M4A",
  "AAC",
  "FLAC",
  "OGG",
  "WEBM",
];

const [file, setFile] = useState(null);
 const [audioInfo, setAudioInfo] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const getBrowserDuration = (selectedFile) => {
    return new Promise((resolve) => {
      const audio = document.createElement("audio");

      const objectUrl = URL.createObjectURL(selectedFile);

      audio.preload = "metadata";

      audio.onloadedmetadata = () => {
        const duration = audio.duration;

        URL.revokeObjectURL(objectUrl);

        resolve(duration);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(objectUrl);

        resolve(null);
      };

      audio.src = objectUrl;
    });
  };

    const handleChange = async (selectedFile) => {
    try {
      setError("");
      setFile(selectedFile);
      setLyrics("");
      setSegments([]);
      setAudioInfo(null);
      setLoading(true);

      // Browser duration
      const browserDuration =
        await getBrowserDuration(selectedFile);

      // --------------------------------
      // Send file to Next.js API
      // --------------------------------

      const formData = new FormData();

      formData.append("audio", selectedFile);

      const response = await fetch("/api/lyrics", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to process audio"
        );
      }

      // --------------------------------
      // Update audio information
      // --------------------------------

      setAudioInfo({
        ...data.file,

        // fallback to browser duration
        duration:
          data.file.duration || browserDuration,

        durationFormatted:
          data.file.durationFormatted ||
          formatDuration(browserDuration),
      });

      // --------------------------------
      // Lyrics
      // --------------------------------

      setLyrics(data.lyrics || "");

      setSegments(data.segments || []);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong while processing audio"
      );
    } finally {
      setLoading(false);
    }
  };


    const formatDuration = (seconds) => {
    if (!seconds || !Number.isFinite(seconds)) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

   const formatTimestamp = (seconds) => {
    if (!Number.isFinite(seconds)) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  function Info({ label, value }) {
  return (
    <div className="border rounded-lg p-4">

      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="font-medium mt-1 break-all">
        {value}
      </div>

    </div>
  );
}


    return (
        <div>
             <FileUploader
          handleChange={handleChange}
          name="audio"
          types={fileTypes}
          multiple={false}
          label="Drag & Drop your music file"
        />
          {loading && (
        <div className="mt-6 p-4 border rounded-lg">
          Processing audio and generating lyrics...
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 border border-red-300 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {file && audioInfo && !loading && (
        <div className="mt-6">

          <h2 className="text-xl font-semibold mb-4">
            Audio Information
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* File name */}

            <Info
              label="File Name"
              value={audioInfo.name}
            />

            {/* Type */}

            <Info
              label="File Type"
              value={audioInfo.type}
            />

            {/* Size */}

            <Info
              label="File Size"
              value={audioInfo.sizeFormatted}
            />

            {/* Duration */}

            <Info
              label="Duration"
              value={audioInfo.durationFormatted}
            />

            {/* Bitrate */}

            <Info
              label="Bitrate"
              value={
                audioInfo.bitrateFormatted || "Unknown"
              }
            />

            {/* Sample Rate */}

            <Info
              label="Sample Rate"
              value={
                audioInfo.sampleRateFormatted ||
                "Unknown"
              }
            />

            {/* Channels */}

            <Info
              label="Channels"
              value={
                audioInfo.channelsFormatted ||
                "Unknown"
              }
            />

            {/* Codec */}

            <Info
              label="Codec"
              value={audioInfo.codec || "Unknown"}
            />

            {/* Container */}

            <Info
              label="Container"
              value={
                audioInfo.container || "Unknown"
              }
            />

          </div>

        </div>
      )}

       {lyrics && !loading && (
        <div className="mt-8">

          <h2 className="text-xl font-semibold mb-4">
            Lyrics
          </h2>

          <div className="border rounded-lg p-5 whitespace-pre-line">
            {lyrics}
          </div>

        </div>
      )}
      {segments.length > 0 && !loading && (
        <div className="mt-8">

          <h2 className="text-xl font-semibold mb-4">
            Timestamped Lyrics
          </h2>

          <div className="border rounded-lg overflow-hidden">

            {segments.map((segment, index) => (
              <div
                key={index}
                className="flex gap-4 p-3 border-b last:border-b-0"
              >

                <span className="text-gray-500 min-w-[60px]">
                  {formatTimestamp(segment.start)}
                </span>

                <span>
                  {segment.text}
                </span>

              </div>
            ))}

          </div>

        </div>
      )}
    </div>

    )}