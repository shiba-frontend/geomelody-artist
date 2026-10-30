"use client";
import ArtistLineup from "@/component/event/ArtistLineup";
import EventDetails from "@/component/event/EventDetails";
import EventSettings from "@/component/event/EventSettings";
import TicketSetup from "@/component/event/TicketSetup";
import VenueDetails from "@/component/event/VenueDetails";
import {
  validateEventDetails,
  validateEventField,
} from "@/lib/validation/eventDetails";
import { validateTicketing, validateTicketingField } from "@/lib/validation/ticketing";
import { validateVenueDetails, validateVenueField } from "@/lib/validation/venueDetails";
import { Check } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    title: "Basic Details",
    description: "Event name, event type, category",
    iscomplete: false,
  },
  {
    title: "Date & Venue",
    description: "Date & venue details",
    iscomplete: false,
  },
  {
    title: "Artist & Lineup Details",
    description: "Add your supporting artist",
    iscomplete: false,
  },
  {
    title: "Ticketing Setup",
    description: "Ticket price setup",
    iscomplete: false,
  },
  {
    title: "Event Settings",
    description: "Check your event details and submit",
    iscomplete: false,
  },
];

export default function CreateEvent() {
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventType: "",
    eventCategory: "",
    eventImage: "",
  });

   const [venueDetails, setVenueDetails] = useState({
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    venueName: "",
    venueAddress:"",
    latitude:'',
    longitude:'',
    country:"",
    city:"",
    venueType:"",
    constactPerson:"",
    contactEmail:"",
    contactPhone:"",
    contactCountryIso: "US",
    contactDialCode: "+1",
    contactDesignation:"",

  });

   const [artistLineup, setartistLineup] = useState({
    leadArtist: 'Indranil_Rockz',
    artistmember:[]
  });

     const [ticketDetails, setTicketDetails] = useState({
    tickets:[],
    ticketType:'paid',
    earlyBirdDiscount:'',
    earlyBirdDiscountDate:''
  });

  const EventInputHandler = (updatedData) => {
    setEventDetails(updatedData);
  };

   const venueInputHandler = (updatedData) => {
    setVenueDetails(updatedData);
  };
 const TickeInputHandler = (updatedData) => {
    setTicketDetails(updatedData);
  };
  



  const handleFieldChange = (field, value) => {
    const message = validateEventField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[1] || {}) };
        delete stepErrors[field];
        return { ...prev, 1: stepErrors };
      });
    }
  };

   const handleVenueFieldChange = (field, value) => {
    const message = validateVenueField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[2] || {}) };
        delete stepErrors[field];
        return { ...prev, 2: stepErrors };
      });
    }
  };

  const handleTicketFieldChange = (field, value) => {
    const message = validateTicketingField(field, value);
    if (!message) {
      setErrors((prev) => {
        const stepErrors = { ...(prev[4] || {}) };
        delete stepErrors[field];
        return { ...prev, 4: stepErrors };
      });
    }
  };

  function validateStep(step) {
    switch (step) {
      case 1:
        return validateEventDetails(eventDetails);
        case 2:
        return validateVenueDetails(venueDetails);      
        case 4:
        return validateTicketing(ticketDetails); 
      default:
        return {}; // no validation defined yet — treat as valid
    }
  }

  const SaveAndNext = () => {
    const stepErrors = validateStep(activeStep);
    const hasErrors = Object.keys(stepErrors).length > 0;

    setErrors((prev) => ({ ...prev, [activeStep]: stepErrors }));

    if (hasErrors) {
      return; // stop here — don't advance past an invalid step
    }

    setActiveStep((prevStep) => Math.min(prevStep + 1, STEPS.length));
  };










  return (
    <div className="flex gap-5">
      <div className="w-[70%]">
        {activeStep == 1 && (
          <EventDetails
            data={eventDetails}
            onChange={EventInputHandler}
            onFieldChange={handleFieldChange}
            errors={errors[1] || {}}
          />
        )}
         {activeStep == 2 && (
          <VenueDetails
            data={venueDetails}
            onChange={venueInputHandler}
            onFieldChange={handleVenueFieldChange}
            errors={errors[2] || {}}
          />
        )}

         {activeStep == 3 && (
          <ArtistLineup
            data={artistLineup}
            onChange={venueInputHandler}
            onFieldChange={handleVenueFieldChange}
            errors={errors[3] || {}}
          />
        )}

        {activeStep == 4 && (
          <TicketSetup
            data={ticketDetails}
            onChange={TickeInputHandler}
            onFieldChange={handleTicketFieldChange}
            errors={errors[4] || {}}
          />
        )}

         {activeStep == 5 && (
          <EventSettings
            data={ticketDetails}
            onChange={TickeInputHandler}
            onFieldChange={handleTicketFieldChange}
            errors={errors[4] || {}}
          />
        )}
       
      </div>
      <div className="w-[30%]">
        <div className="bg-card-gradient rounded-[10px] p-4 mb-3">
          <h3 className="text-[22px] font-bold text-[#FFCD27] mb-5">
            <img
              src="/fav.png"
              alt="Favicon"
              className="inline-block mr-1 w-8"
            />{" "}
            Why Geomelody?
          </h3>
          <div className="flex items-center gap-2 mb-6 ">
            <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full">
              <Check size={16} />
            </span>
            <p className="text-[16px] font-medium">
              Reach millions of listeners of worldwide
            </p>
          </div>
          <div className="flex items-center gap-2 mb-6 ">
            <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full">
              <Check size={16} />
            </span>
            <p className="text-[16px] font-medium">Keep 100% of your rights</p>
          </div>
          <div className="flex items-center gap-2 mb-6 ">
            <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full">
              <Check size={16} />
            </span>
            <p className="text-[16px] font-medium">
              Track your performance & earnings
            </p>
          </div>
        </div>
        <div className="rounded-3xl p-6 bg-card-gradient">
          <h2 className="text-amber-400 text-2xl font-bold mb-2">Steps</h2>
          <p className="text-white/50 text-sm mb-8">
            Please follow the following steps for upload your music
          </p>

          <div>
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === activeStep;
              const isLast = index === STEPS.length - 1;
              const isComplete = stepNumber < activeStep;

              return (
                <div key={step.title} className="flex gap-4">
                  {/* Number + connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 border-2 border-[#fff] ${
                        isActive
                          ? "bg-amber-400 text-[#fff]"
                          : isComplete
                            ? "bg-[#1BC50B] text-black"
                            : "bg-white/15 text-white"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 flex-1 ${isComplete ? "bg-[#1BC50B]" : "bg-white/25"}`}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div className={isLast ? "pb-0" : "pb-8"}>
                    <h3
                      className={`text-[15px] font-semibold mb-1 ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-white/20 hover:bg-white/25 text-white/90 font-medium text-lg py-3 rounded-full transition-colors">
              Draft
            </button>
            {activeStep === 5 ? (
              <button
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-lg py-3 rounded-full transition-colors cursor-pointer"
                onClick={() => SaveAndNext()}
              >
                Submit
              </button>
            ) : (
              <button
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-lg py-3 rounded-full transition-colors cursor-pointer"
                onClick={() => SaveAndNext()}
              >
                Save & Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
