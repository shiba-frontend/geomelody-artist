import OpenAI, { toFile } from "openai";
import { parseBuffer } from "music-metadata";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const formatDuration = (seconds) => {
  if (!seconds || !Number.isFinite(seconds)) {
    return "00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

const formatBitrate = (bitrate) => {
  if (!bitrate || !Number.isFinite(bitrate)) {
    return null;
  }

  return `${Math.round(bitrate / 1000)} kbps`;
};

export async function POST(request) {
  try {
    const formData = await request.formData();

    const audioFile = formData.get("audio");

    if (!audioFile) {
      return Response.json(
        {
          success: false,
          error: "Audio file is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!audioFile.type?.startsWith("audio/")) {
      return Response.json(
        {
          success: false,
          error: "Only audio files are allowed",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // Convert uploaded File to Buffer
    // --------------------------------

    const arrayBuffer = await audioFile.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    // --------------------------------
    // Read audio metadata
    // --------------------------------

    const metadata = await parseBuffer(
      buffer,
      {
        mimeType: audioFile.type,
        size: buffer.length,
      },
      {
        duration: true,
      }
    );

    const format = metadata.format;

    const duration = format.duration || 0;

    const bitrate = format.bitrate || null;

    const sampleRate = format.sampleRate || null;

    const numberOfChannels = format.numberOfChannels || null;

    const codec = format.codec || null;

    const container = format.container || null;

    // --------------------------------
    // Send audio to OpenAI
    // --------------------------------

    const openAIFile = await toFile(
      buffer,
      audioFile.name,
      {
        type: audioFile.type,
      }
    );

    const transcription = await openai.audio.transcriptions.create({
      file: openAIFile,

      // whisper-1 supports timestamped verbose JSON
      model: "whisper-1",

      response_format: "verbose_json",

      timestamp_granularities: ["segment"],
    });

    // --------------------------------
    // Format timestamped lyrics
    // --------------------------------

    const segments = (transcription.segments || []).map((segment) => ({
      start: segment.start,
      end: segment.end,
      text: segment.text?.trim() || "",
    }));

    return Response.json({
      success: true,

      file: {
        name: audioFile.name,

        type: audioFile.type,

        size: buffer.length,

        sizeFormatted: formatFileSize(buffer.length),

        duration,

        durationFormatted: formatDuration(duration),

        bitrate,

        bitrateFormatted: formatBitrate(bitrate),

        sampleRate,

        sampleRateFormatted: sampleRate
          ? `${sampleRate} Hz`
          : null,

        channels: numberOfChannels,

        channelsFormatted:
          numberOfChannels === 1
            ? "Mono"
            : numberOfChannels === 2
            ? "Stereo"
            : numberOfChannels
            ? `${numberOfChannels} channels`
            : null,

        codec,

        container,
      },

      lyrics: transcription.text || "",

      segments,
    });
  } catch (error) {
    console.error("Audio processing error:", error);

    return Response.json(
      {
        success: false,
        error:
          error?.message ||
          "Unable to process audio file",
      },
      {
        status: 500,
      }
    );
  }
}