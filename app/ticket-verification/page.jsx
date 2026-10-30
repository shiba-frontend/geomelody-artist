"use client";

import { useState } from "react";




export default function TicketPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


   const handleVerifyPasscode = async () => {
    if (!passcode.trim()) {
      setError("Please enter the passcode.");
      return;
    }

    setError("");
    setLoading(true);


     window.location.href = "/ticket-verification/eventId";
      localStorage.setItem("passcode", passcode);

      return

    try {
      const response = await fetch(
        "/api/ticket-verification/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passcode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Invalid or expired passcode."
        );
        return;
      }

      // Passcode is valid, redirect to the ticket scanner page
      window.location.href = "/ticket-verification/eventId";
      localStorage.setItem("passcode", passcode);
    } catch (error) {
      console.error(error);
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="" style={{ background: "linear-gradient(179deg,rgba(21, 0, 49, 1) 0%, rgba(0, 1, 7, 1) 100%); height: 100vh" }}>
       

    <div className="grid grid-cols-1 lg:grid-cols-2">

      <div className="relative p-10 hidden lg:block" style={{background:'url(/scan.png)', backgroundSize:'cover', backgroundPosition:'center', height:'100vh'}}>
          
          <img src="/event-bg.png" alt="Scan" className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0" />
          <img src="/logo.png" alt="Logo" className="z-10 relative" />
      </div>
      <div className="flex  justify-center items-center p-10 h-screen">
        <div>
          <img src="/logo.png" alt="Logo" className="z-10 absolute top-10 left-10 lg:hidden" />
            <h3 className="text-[24px] font-bold mb-1">Ticket Verification</h3>
              <p className="mb-3">Create your artist account and take the first step toward sharing your music with the world.</p>
          <label>Enter your Passcode</label>
          <input
            id="passcode"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleVerifyPasscode();
              }
            }}
            placeholder="Enter passcode"
            className={`w-full rounded-lg border px-4 py-3 outline-none transition mt-2 mb-4
              ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }
            `}
          />

          {/* Error */}
          {error && (
            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>
          )}
          <div className="flex items-center justify-center">
             <button
          type="button"
          onClick={handleVerifyPasscode}
          disabled={loading}
          className="theme-bttn disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
          </div>
      
            
        </div>
      
        
      </div>
  
      </div>

    
    </div>
  );
}
