"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { Lock, Pencil, X } from "lucide-react";

interface OtpVerificationProps {
  /** The email address or phone number the code was sent to */
  identifier: string;
  /** Which flow this is — changes the label text ("email" vs "phone number") */
  type?: "email" | "phone";
  length?: number;
  resendSeconds?: number;
  onVerify?: (code: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  /** Edit the email/phone before it was sent (pencil icon) */
  onEditIdentifier?: () => void;
  /** Show a close (X) button, e.g. when used inside a Modal */
  onClose?: () => void;
}

export default function OtpVerification({
  identifier,
  type = "email",
  length = 6,
  resendSeconds = 60,
  onVerify,
  onResend,
  onEditIdentifier,
  onClose,
}: OtpVerificationProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // Auto-submit once all digits are filled
  useEffect(() => {
    const code = digits.join("");
    if (code.length === length && !digits.includes("")) {
      handleVerify(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  function handleChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handles a single digit or a fast-typed/pasted string landing in one box
    const chars = value.split("");
    const next = [...digits];
    let i = index;
    for (const char of chars) {
      if (i >= length) break;
      next[i] = char;
      i++;
    }
    setDigits(next);
    setError("");

    const nextEmptyIndex = next.findIndex((d, idx) => idx >= index && d === "");
    const targetIndex = nextEmptyIndex === -1 ? Math.min(i, length - 1) : nextEmptyIndex;
    inputsRef.current[targetIndex]?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!pasted) return;

    const next = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);

    const targetIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[targetIndex]?.focus();
  }

  async function handleVerify(code: string) {
    setIsVerifying(true);
    setError("");
    try {
      await onVerify?.(code);
    } catch {
      setError("Invalid code. Please try again.");
      setDigits(Array(length).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    if (secondsLeft > 0) return;
    setDigits(Array(length).fill(""));
    setError("");
    setSecondsLeft(resendSeconds);
    inputsRef.current[0]?.focus();
    await onResend?.();
  }

  const label = type === "phone" ? "phone number" : "email";

  return (
    <div
      className="relative w-full max-w-sm rounded-3xl p-8 text-center border border-white/5"
      style={{
        background:
          "radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.25), transparent 60%), linear-gradient(180deg, #1a0a24 0%, #0d0510 100%)",
      }}
    >
      {/* Close button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Lock icon */}
      <div className="flex justify-center mb-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(145deg, #3a3a42, #18181c)",
            boxShadow: "0 0 40px rgba(168, 85, 247, 0.35)",
          }}
        >
          <Lock className="w-9 h-9 text-white" strokeWidth={1.75} />
        </div>
      </div>

      <h2 className="text-white text-2xl font-semibold mb-2">{length} digit code</h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        Please enter the {length} digit OTP verification code
        <br />
        sent to your {label}{" "}
        <span className="text-gray-300">{identifier}</span>{" "}
        <button
          type="button"
          onClick={onEditIdentifier}
          className="inline-flex align-middle text-purple-400 hover:text-purple-300"
          aria-label={`Edit ${label}`}
        >
          <Pencil className="w-3.5 h-3.5 inline" />
        </button>
      </p>

        {/* Digit boxes */}
        <div className="flex justify-center gap-2 my-8">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className="w-11 h-12 rounded-xl bg-white/5 border border-purple-500/30 text-white text-center text-lg font-medium focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition disabled:opacity-50"
              placeholder="-"
            />
          ))}
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <p className="text-gray-500 text-sm">
        Having trouble?{" "}
        {secondsLeft > 0 ? (
          <span>Resend code in {secondsLeft} sec</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}
