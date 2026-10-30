"use client";
import { motion } from "framer-motion";
function ProgressRing({ percent = 20, size = 96, stroke = 6 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        {/* progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4ade80"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-xl">{percent}%</span>
      </div>
    </div>
  );
}

export default function WelcomeCard({
  name = "Indranil",
  profileCompletion = 20,
  onCompleteProfile,
  plan = {
    name: "Artist Pro",
    price: "24.99",
    interval: "Year",
    blurb:
      "Perfect for independent artists, singers, musicians, producers & composers",
  },
  onViewFeatures,
}) {
  return (
    <div
      className="rounded-3xl overflow-hidden bg-card-gradient"
     
    >
      {/* Welcome section */}
      <div className="flex items-start gap-6 p-8">
        <ProgressRing percent={profileCompletion} />

        <div>
          <h2 className="text-white text-[48px] font-bold mb-2 leading-none">
            Welcome, {name}
          </h2>
          <p className="text-white/60 text-[24px] leading-relaxed  mb-5">
            Your music, your profile, your audience — all in one place.
            Complete your artist profile, manage your music, and grow your
            presence.
          </p>

           <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="theme-bttn mt-5"
                        >
                          <a href="/profile/artist-identity">
                            Complete Profile
                          </a>
                        </motion.button>

       
        </div>
      </div>

      <div className="h-px bg-white/10 mx-8" />

      {/* Subscription section */}
      <div className="p-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-white text-[34px] font-semibold mb-2">
            Subscription Plan
          </h3>
          <p className="text-[#FFCD27] text-[28px] font-medium mb-2">{plan.name}</p>
          <p className="text-white mb-3">
            <span className="text-[34px] font-bold">${plan.price}</span>
            <span className="text-white/40 text-sm"> / {plan.interval}</span>
          </p>
          <p className="text-white/50 text-[16px] max-w-xs">{plan.blurb}</p>
        </div>

        <button
          onClick={onViewFeatures}
          className="text-amber-400 text-sm underline underline-offset-2 hover:text-amber-300 transition-colors whitespace-nowrap mt-auto"
        >
          View 10+ Features
        </button>
      </div>
    </div>
  );
}


