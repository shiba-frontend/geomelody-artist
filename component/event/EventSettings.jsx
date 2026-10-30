import { Check } from "lucide-react";
import { useState } from "react";

export default function EventSettings({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {
  const [socialActive, setSocialActive] = useState(true);

  function handleFieldChange(field, value) {
    const updated = { ...data, [field]: value };
    onChange(updated);
    onFieldChange?.(field, value, updated);
  }

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <div>
          <h3 className="text-[24px] font-bold text-white mb-1">
            Event Setting and Supporting Documents
          </h3>
          <p className="text-white/70 mb-5">
            Check your event details and submit
          </p>

          <div className="bg-white/10 p-5 rounded-[10px] flex items-center mb-5">
            <div>
              <h4 className="text-[#FFCD27]">Enable Social Auto-Share</h4>
              <p>
                Automatically post event ticket links on Spotify for Artists,
                Instagram, and Twitter.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
                  socialActive
                    ? "bg-white/20 justify-end"
                    : "bg-white/10 justify-start"
                }`}
                aria-pressed={socialActive}
                aria-label={socialActive ? "Active member" : "Inactive member"}
              >
                <span
                  className={`w-5 h-5 rounded-full transition-colors ${
                    socialActive ? "bg-emerald-400" : "bg-white/40"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white/10 p-5 rounded-[10px] flex items-center mb-5">
            <div>
              <h4 className="text-[#FFCD27]">
                I am inform this event is for 18+ Above
              </h4>
              <p>
                This information is inform to listener that this event is above
                18+ people
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-colors cursor-pointer ${
                  socialActive
                    ? "bg-white/20 justify-end"
                    : "bg-white/10 justify-start"
                }`}
                aria-pressed={socialActive}
                aria-label={socialActive ? "Active member" : "Inactive member"}
              >
                <span
                  className={`w-5 h-5 rounded-full transition-colors ${
                    socialActive ? "bg-emerald-400" : "bg-white/40"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label>Supporting Document 1</label>
              <div className="bg-white/10 h-30 rounded-[10px]"></div>
              <small>Agreement</small>
            </div>
            <div className="form-group">
              <label>Supporting Document 2</label>
              <div className="bg-white/10 h-30 rounded-[10px]"></div>
              <small>Police Permission</small>
            </div>
          </div>

          <div
            className="flex gap-3 mt-10  cursor-pointer"
            onClick={() => handleFieldChange("confirm", !data.confirm)}
          >
            <div className="rounded-[2px] border border-[#fff] w-5 h-5">
              {data.confirm && (
                <div className="rounded-[2px] w-5 h-5 bg-[#ffcd27] flex items-center justify-center ">
                  <Check size={12} color="#222" />
                </div>
              )}
            </div>
            <div className="w-[85%]">
              <h5 className=" mb-1">
                I Confirmed that i have submitted all the information is correct
                to validate this event. Geomelody can reject my event for
                publish.{" "}
                <a href="#" className="text-[#6CA7FF]">
                  Rejection Policies
                </a>
              </h5>
            </div>
          </div>
          {errors.confirm && (
            <p className="text-red-400 text-xs mt-1.5">{errors.confirm}</p>
          )}
        </div>

          <div>
            <h3 className="text-[24px] font-bold text-white mb-1"> Event Template </h3>
                <div className="bg-card-gradient rounded-[10px] pb-6">
                      <img src="/event.png" className="w-full h-80 rounded-tl-[10px] rounded-tr-[10px]" />

                    <div className="bg-[#150031] mx-6 p-5 rounded-[10px] mt-[-30px] relative">
                        <h4 className="font-bold text-[20px] mb-5">Review Core Event Details</h4>
                        <div className="flex justify-between mb-2">
                            <h4>Artist</h4>
                             <h4>Indranil_Rockzz (120 mins Performance)</h4>
                        </div>
                        <div className="flex justify-between mb-2">
                            <h4>Location</h4>
                             <h4>The Echo Dome, Los Angeles</h4>
                        </div>
                        <div className="flex justify-between mb-2">
                            <h4>Date & Time</h4>
                             <h4>Oct 24, 2026 • 20:00-22:00</h4>
                        </div>
                        <div className="flex justify-between mb-2">
                            <h4>Ticket Cap</h4>
                             <h4>1,000 Capacity Total</h4>
                        </div>
                    </div>

                </div>
          </div>


      </div>
    </div>
  );
}
