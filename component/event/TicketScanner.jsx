"use client";
// npm install html5-qrcode

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff, RotateCcw } from "lucide-react";

const SCANNER_ELEMENT_ID = "ticket-qr-reader";

export default function TicketScanner({ onScan }) {
  const scannerRef = useRef(null); // holds the Html5Qrcode instance
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState("");

  // Discover available cameras once on mount (needs permission granted
  // first on some browsers, hence wrapped in try/catch).
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices?.length) setCameras(devices);
      })
      .catch(() => {
        setError("Camera access is required to scan tickets.");
      });

    // Stop the camera stream on unmount — forgetting this leaves the
    // camera light on even after navigating away from this page.
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  async function startScanning() {
    if (!cameras.length) return;
    setError("");

    const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);
    scannerRef.current = scanner;

    try {
      await scanner.start(
        cameras[cameraIndex].id,
        { fps: 10, qrbox: { width: 320, height: 320 } },
        (decodedText) => {
          // A successful scan — pause so the same code isn't scanned
          // repeatedly on every frame while it's still in view, and hand
          // the raw decoded text up to the parent to verify against
          // real ticket/attendee data.
          handleDecoded(decodedText);
        },
        () => {
          // fires continuously while no code is found in frame — expected
          // noise, not a real error, so intentionally left empty
        }
      );
      setIsScanning(true);
    } catch (err) {
      setError("Couldn't start the camera. Check permissions and try again.");
    }
  }

  async function stopScanning() {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
      scannerRef.current.clear();
    }
    setIsScanning(false);
    setPaused(false);
  }

  function handleDecoded(decodedText) {
    setPaused(true);
    scannerRef.current?.pause(true);
    onScan?.(decodedText);
  }

  function resumeScanning() {
    scannerRef.current?.resume();
    setPaused(false);
  }

  async function switchCamera() {
    if (cameras.length < 2) return;
    await stopScanning();
    setCameraIndex((prev) => (prev + 1) % cameras.length);
    // startScanning is called again by the effect below once cameraIndex changes
  }

  useEffect(() => {
    if (cameraIndex !== 0 && cameras.length) {
      startScanning();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraIndex]);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Scan Ticket</h3>
        {cameras.length > 1 && (
          <button
            onClick={switchCamera}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
          >
            <RotateCcw size={14} /> Switch camera
          </button>
        )}
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-black aspect-square max-w-sm mx-auto">
        {/* html5-qrcode injects the live camera feed into this div by id */}
        <div id={SCANNER_ELEMENT_ID} className="w-full h-full" />

        {!isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
            <Camera size={32} className="text-white/40" />
            <p className="text-white/50 text-sm text-center px-6">
              {error || "Camera is off"}
            </p>
          </div>
        )}

        {paused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70">
            <p className="text-white text-sm">Ticket scanned</p>
            <button
              onClick={resumeScanning}
              className="bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-sm px-5 py-2 rounded-full transition-colors"
            >
              Scan Next Ticket
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-5">
        {isScanning ? (
          <button
            onClick={stopScanning}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-sm px-6 py-2.5 rounded-full transition-colors"
          >
            <CameraOff size={16} /> Stop Scanning
          </button>
        ) : (
          <button
            onClick={startScanning}
            disabled={!cameras.length}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-[#150a20] font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
          >
            <Camera size={16} /> Start Scanning
          </button>
        )}
      </div>
    </div>
  );
}
