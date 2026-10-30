import Autocomplete from "react-google-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DEFAULT_COUNTRY_ISO } from "@/lib/validation/venueDetails";


const countryList = [
  { id: 1, title: "India" },
  { id: 2, title: "USA" },
];

export default function VenueDetails({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {

  const [dialcodeMenu, setDialcodeMenu] = useState(false);
  const dialcodeList = [
    { id: 1, flag: "/indian.png", code: "+91", iso: "IN" },
    { id: 2, flag: "/us.png", code: "+1", iso: "US" },
  ];

  const dialcode =
  dialcodeList.find(
    (d) => d.iso === (data.contactCountryIso || DEFAULT_COUNTRY_ISO)
  ) || dialcodeList[0];

  function handleDialcodeChange(item) {
  const updated = {
    ...data,
    contactDialCode: item.code, // e.g. "+91" — you'll want this at submit time
    contactCountryIso: item.iso, // e.g. "IN" — what the validator uses
  };
  onChange(updated);
   
  onFieldChange?.("contactPhone", updated.contactPhone ?? "", updated);
  setDialcodeMenu(false);
}

 

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  today.setDate(today.getDate() + 15);

  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
    onFieldChange(field, value);
  }

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const onPlaceChanged = (place) => {
    console.log("Selected address:", place);
    getLatlong(place.formatted_address);

    onChange("venueAddress", place.formatted_address);
    onFieldChange("venueAddress", place.formatted_address);
  };

  const getLatlong = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();
        onChange("latitude", latitude);
        onChange("longitude", longitude);
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status,
        );
      }
    });
  };

  return (
    <div>
      <h3 className="text-[24px] font-bold text-white mb-1">Date & Venue</h3>
      <p className="text-white/70 mb-5">Date & venue details</p>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
        <div className="form-group relative">
          <label>
            Event Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            minDate={today}
            maxDate={maxDate}
            selected={data.eventDate}
            onChange={(date) => handleFieldChange("eventDate", date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select date"
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.eventDate
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          />

          {errors.eventDate && (
            <p className="text-red-400 text-xs mt-1.5">{errors.eventDate}</p>
          )}
        </div>
        <div className="form-group relative">
          <label>
            Start Time <span className="text-red-500">*</span>
          </label>
          <DatePicker
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            selected={data.eventStartTime}
            onChange={(date) => handleFieldChange("eventStartTime", date)}
            placeholderText="Select date"
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.eventStartTime
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          />

          {errors.eventStartTime && (
            <p className="text-red-400 text-xs mt-1.5">
              {errors.eventStartTime}
            </p>
          )}
        </div>
        <div className="form-group relative">
          <label>
            End Time <span className="text-red-500">*</span>
          </label>
          <DatePicker
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            selected={data.eventEndTime}
            onChange={(date) => handleFieldChange("eventEndTime", date)}
            placeholderText="Select date"
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.eventEndTime
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          />

          {errors.eventEndTime && (
            <p className="text-red-400 text-xs mt-1.5">{errors.eventEndTime}</p>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <div className="form-group">
          <label>
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={data.country ?? ""}
            onChange={(e) => handleFieldChange("country", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.country
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option>Select Country</option>
            {countryList.map((item) => {
              return <option key={item.id}>{item.title}</option>;
            })}
          </select>

          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            City <span className="text-red-500">*</span>
          </label>
          <select
            value={data.city ?? ""}
            onChange={(e) => handleFieldChange("city", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.city
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option>Select City</option>
            {countryList.map((item) => {
              return <option key={item.id}>{item.title}</option>;
            })}
          </select>

          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="form-group flex-2">
          <label>
            City <span className="text-red-500">*</span>
          </label>
          <select
            value={data.venueType ?? ""}
            onChange={(e) => handleFieldChange("venueType", e.target.value)}
            className={`w-full bg-[#2a1440] border rounded-xl px-4 py-4 text-white outline-none transition-colors ${
              errors.venueType
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option>Venue Type</option>
            <option>Auditorium</option>
            <option>Pub</option>
            <option>Open Ground</option>
          </select>

          {errors.venueType && (
            <p className="text-red-500 text-sm mt-1">{errors.venueType}</p>
          )}
        </div>
        <div className="form-group flex-4">
          <label>
            Venue Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.venueName ?? ""}
            onChange={(e) => handleFieldChange("venueName", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.venueName
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            placeholder="Enter venue name"
          />
          {errors.venueName && (
            <p className="text-red-500 text-sm mt-1">{errors.venueName}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>
          Venue Address <span className="text-red-500">*</span>
        </label>
        <Autocomplete
          className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
            errors.venueAddress
              ? "border-red-500"
              : "border-white/20 focus:border-amber-400"
          }`}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: ["in", "us"] },
          }}
          apiKey={googleMapsApiKey}
          onPlaceSelected={(place) => {
            onPlaceChanged(place);
          }}
        />

        {errors.venueAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.venueAddress}</p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <div className="form-group ">
          <label>
            Contact Person Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.contactPerson ?? ""}
            onChange={(e) => handleFieldChange("contactPerson", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.contactPerson
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            placeholder="Enter contact person name"
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            Contact Person Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.contactDesignation ?? ""}
            onChange={(e) =>
              handleFieldChange("contactDesignation", e.target.value)
            }
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.contactDesignation
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            placeholder="Enter contact person designation"
          />
          {errors.contactDesignation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactDesignation}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <div
          className="form-group relative"
          onMouseLeave={() => setDialcodeMenu(false)}
        >
          <label>
            Contact Number <span className="text-red-500">*</span>
          </label>

          <div
            className="flex items-center absolute top-13 left-5 gap-1.5 cursor-pointer text-[15px] w-20"
            onClick={() => setDialcodeMenu(!dialcodeMenu)}
          >
            <img src={dialcode.flag} /> {dialcode.code}{" "}
            <ChevronDown color="#FFCD27" className="h-5 w-5 pl-1" />
          </div>
          <AnimatePresence>
            {dialcodeMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute left-0 top-full z-50 w-full"
              >
                <div className="glass-panel overflow-hidden rounded-[5px]">
                  {dialcodeList.map((item) => (
                    <div
                      className="flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#28262c]"
                      key={item.id}
                      onClick={() => handleDialcodeChange(item)}
                    >
                      <div className="border border-[#ddd] w-3 h-3 rounded-full flex justify-center items-center">
                        {dialcode.id === item.id && (
                          <div className="w-2 h-2 rounded-full bg-[#FFCD27]"></div>
                        )}
                      </div>
                      <h4 className="text-[15px]">{item.code}</h4>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="text"
            value={data.contactPhone ?? ""}
            onChange={(e) => handleFieldChange("contactPhone", e.target.value.replace(/\D/g, ""))}
            className={`w-full bg-transparent border rounded-xl px-30 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.contactPhone
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            placeholder="Enter contact number"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
          )}
        </div>
        <div className="form-group">
          <label>
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.contactEmail ?? ""}
            onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.contactEmail
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            placeholder="Enter contact email"
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
          )}
        </div>
      </div>
    </div>
  );
}
