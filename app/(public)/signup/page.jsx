"use client";
import { CalendarDays, ChevronDown, House } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  validateEmail,
  validateRequired,
  validatePhoneForCountry
} from "@/lib/validation/authvalidation";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import AuthRight from "@/component/AuthRight";
import OtpVerification from "@/component/OtpVerification";
import Modal from "@/component/Modal";
import { useSignupMutation } from "@/lib/useMutations";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fname: "",
    lname: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [titleMenu, setTitleMenu] = useState(false);
  const [title, setTitle] = useState("Mr.");
  const [gender, setGender] = useState("");
  const [genderMenu, setGenderMenu] = useState(false);
  const [CountryMenu, setCountryMenu] = useState(false);
  const [cityMenu, setCityMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dob, setDob] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [dialcodeMenu, setDialcodeMenu] = useState(false);
  const [country, setCountry] = useState({ id: null, title: "" });
  // FIX: city needs its own state — it was reusing `country` before
  const [city, setCity] = useState({ id: null, title: "" });
  const [citysearch, setCitysearch] = useState("");
  const [dialcode, setDialcode] = useState({
    id: 1,
    flag: "/indian.png",
    code: "+91",
    iso: "IN",
  });

  const [cityList, setCityList] = useState([
    { id: 1, title: "Kolkata" },
    { id: 2, title: "Mumbai" },
    { id: 3, title: "Delhi" },
  ]);

  const dialcodeList = [
    { id: 1, flag: "/indian.png", code: "+91", iso: "IN" },
    { id: 2, flag: "/us.png", code: "+1", iso: "US" },
  ];

  const countryList = [
    { id: 1, title: "India" },
    { id: 2, title: "USA" },
  ];

  // FIX: cities need their own list — City was rendering countryList before.
  // Swap this for a real lookup keyed off `country.id` once you have real data.


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  }

  function GenderHandler(value) {
    setGender(value);
    setGenderMenu(false);
    if (!value) {
      setErrors((prev) => ({ ...prev, gender: "Gender is required" }));
    } else {
      setErrors((prev) => ({ ...prev, gender: "" }));
    }
  }

  // FIX: clear the country error the moment a valid selection is made,
  // otherwise the "Country is required" message stays on screen forever
  // once it's been shown, even after the user picks one.
  function CountryHandler(item) {
    setCountry(item);
    setCountryMenu(false);
    setErrors((prev) => ({ ...prev, country: "" }));
  }

  function CityHandler(item) {
    setCity(item);
    setCityMenu(false);
    setErrors((prev) => ({ ...prev, city: "" }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  }

  function validateField(name, value) {
    let result;
    switch (name) {
      case "email":
        result = validateEmail(value);
        break;
      case "phone":
        result = validatePhoneForCountry(value, dialcode.iso);
        break;
      case "fname":
        result = validateRequired(value);
        break;
      case "lname":
        result = validateRequired(value);
        break;
      default:
        return;
    }
    setErrors((prev) => ({ ...prev, [name]: result?.error || undefined }));
  }

  function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const today = new Date();
  const fromYear = today.getFullYear() - 120;
  const toYear = today.getFullYear();

  const handleSelect = (date) => {
    setSelected(date);
    setDob(date);
    setOpen(false);
    // FIX: clear the dob error once a date is actually picked
    setErrors((prev) => ({ ...prev, dob: "" }));
  };

  function handlePhoneChange(e) {
    const { name } = e.target;
    const numbersOnly = e.target.value.replace(/[^0-9]/g, "");

    setFormData((prev) => ({ ...prev, [name]: numbersOnly }));

    if (touched[name]) {
      validateField(name, numbersOnly);
    }
  }

  // Re-validate the phone against the newly selected country's rules —
  // otherwise switching from +91 to +1 leaves a stale error (or a stale
  // "valid") based on the old country's digit-length requirements.
  function handleDialcodeChange(item) {
    setDialcode(item);
    setDialcodeMenu(false);
    if (formData.phone) {
      const result = validatePhoneForCountry(formData.phone, item.iso);
      setErrors((prev) => ({ ...prev, phone: result?.error }));
    }
  }

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "" }));
    } else if (!EMAIL_REGEX.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const isValidEmail = formData.email && !errors.email;
  const isValidPhone =
    formData.phone && !validatePhoneForCountry(formData.phone, dialcode.iso).error;


    const signupMutation = useSignupMutation();

const SubmitHandler = () => {

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!EMAIL_REGEX.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else if (!formData.phone) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
    } else if (validatePhoneForCountry(formData.phone, dialcode.iso).error) {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhoneForCountry(formData.phone, dialcode.iso).error,
      }));
    } else if (!formData.fname) {
      setErrors((prev) => ({ ...prev, fname: "First name is required" }));
    } else if (!formData.lname) {
      setErrors((prev) => ({ ...prev, lname: "Last name is required" }));
    } else if (!gender) {
      // FIX: was checking `formData.gender`, but gender is tracked in its
      // own `gender` state, not inside `formData` — this check could never
      // actually fail even when nothing was selected.
      setErrors((prev) => ({ ...prev, gender: "Gender is required" }));
    } else if (dob === null) {
      setErrors((prev) => ({ ...prev, dob: "Date of birth is required" }));
    } else if (!country.title) {
      // FIX: was checking `!country` (the object), which is always truthy
      // since it starts as `{ id: null, title: "" }`, not falsy.
      setErrors((prev) => ({ ...prev, country: "Country is required" }));
    } else if (!city.title) {
      // FIX: was checking `!formData.city`, which never existed in formData.
      setErrors((prev) => ({ ...prev, city: "City is required" }));
    } else {
      toast.success("Signup successful! Please check your email for verification.");
  signupMutation.mutate(formData, {
    onSuccess: () => {
      // redirect, show success, etc.
    },
    onError: (err) => {
      setErrors((prev) => ({ ...prev, submit: err.response?.data?.message || "Signup failed" }));
    },
  
  });
}
};



  return (
    <div className="bg-signup relative">
      <div className="w-full px-4 md:px-8 mx-auto py-3">
        <div className="flex items-center py-3">
          <div className="lg:w-1/3 md:w-1/4 w-1/2">
            <a href="/">
              <img src="/logo.svg" className="w-30 lg:w-auto" />
            </a>
          </div>
          <div className="lg:w-2/3 md:w-3/4 w-1/2 text-right">
            <ul className="justify-end lg:gap-5 gap-2 flex items-center">
              <li>
                <a href="/" className="flex gap-2">
                  <House /> Home
                </a>
              </li>
              <li>
                <a href="/login" className="get-bttn">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:px-10 px:4 py-10">
          <div className="lg:w-1/2 w-full relative">
            <h2 className="lg:text-[38px] text-[28px] font-bold mb-3">
              Welcome to Geomelody
            </h2>
            <p className="lg:text-[20px] text-[16px] mb-6">
              Create your artist account and take the first step toward sharing
              your <br></br> music with the world.
            </p>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
              <div className="form-group">
                <label>Your Email ID</label>
                <div className="relative">
                  <span className="field-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <path fill="#FFCD27" d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    className="form-control border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                    placeholder="Your email ID"
                     autoComplete="off"
                  />
                  {isValidEmail && (
                    <motion.button
                      onClick={() => setShowOtp(true)}
                      whileHover={{ scale: 1.1 }}
                      className="bg-[#900DA4] px-6 py-2 rounded-[30px] cursor-pointer absolute right-3 top-3.5"
                    >
                      Verify
                    </motion.button>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label>Your Mobile Number</label>
                <div className="relative" onMouseLeave={() => setDialcodeMenu(false)}>
                  <span className="field-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                      <g fill="#FFCD27">
                        <path d="M11 18.183a1 1 0 1 1 2 0a1 1 0 0 1-2 0m-.5-14.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"></path>
                        <path fillRule="evenodd" d="M10.168.933h3.664c.883 0 1.591 0 2.164.047c.588.048 1.099.149 1.57.389a4 4 0 0 1 1.748 1.748c.24.47.341.982.39 1.57c.046.573.046 1.28.046 2.163v9.665c0 .883 0 1.59-.047 2.163c-.048.589-.149 1.1-.389 1.57a4 4 0 0 1-1.748 1.749c-.471.24-.982.34-1.57.389c-.573.047-1.281.047-2.164.047h-3.664c-.883 0-1.591 0-2.164-.047c-.588-.048-1.099-.15-1.57-.39a4 4 0 0 1-1.748-1.747c-.24-.471-.341-.982-.39-1.57c-.046-.573-.046-1.281-.046-2.164V6.85c0-.882 0-1.59.047-2.163c.048-.588.149-1.1.389-1.57a4 4 0 0 1 1.748-1.748c.471-.24.982-.341 1.57-.39c.573-.046 1.281-.046 2.164-.046M8.126 2.475c-.495.04-.787.116-1.011.23a2.5 2.5 0 0 0-1.093 1.093c-.114.224-.19.516-.23 1.011c-.041.505-.042 1.151-.042 2.074v9.6c0 .922 0 1.569.042 2.073c.04.496.116.787.23 1.012a2.5 2.5 0 0 0 1.093 1.092c.224.114.516.19 1.011.231c.505.041 1.152.042 2.074.042h3.6c.922 0 1.57 0 2.073-.042c.496-.04.788-.116 1.012-.23a2.5 2.5 0 0 0 1.092-1.093c.115-.225.19-.516.231-1.012c.041-.504.042-1.15.042-2.073v-9.6c0-.923 0-1.57-.042-2.074c-.04-.495-.116-.787-.23-1.011a2.5 2.5 0 0 0-1.093-1.093c-.224-.114-.516-.19-1.012-.23c-.504-.042-1.15-.042-2.073-.042h-3.6c-.922 0-1.57 0-2.074.042" clipRule="evenodd"></path>
                      </g>
                    </svg>
                  </span>
                  <div
                    className="flex items-center absolute top-5.5 left-15 gap-1.5 cursor-pointer text-[15px] w-20"
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
                    name="phone"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={handleBlur}
                    className="form-control-three border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                    placeholder="Your Mobile Number"
                    autoComplete="off"
                  />
                  {isValidPhone && (
                    <motion.button
                      onClick={() => setShowPhoneOtp(true)}
                      whileHover={{ scale: 1.1 }}
                      className="bg-[#900DA4] px-6 py-2 rounded-[30px] cursor-pointer absolute right-3 top-3.5"
                    >
                      Verify
                    </motion.button>
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label>First Name</label>
                <div className="relative" onMouseLeave={() => setTitleMenu(false)}>
                  <div
                    className="flex items-center absolute top-5.5 left-5 border-r-1 border-[#888] pr-4 cursor-pointer text-[15px] w-17"
                    onClick={() => setTitleMenu(!titleMenu)}
                  >
                    {title} <ChevronDown color="#FFCD27" className="h-5 w-5 pl-1" />
                  </div>
                  <AnimatePresence>
                    {titleMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-3 top-full z-50 w-25"
                      >
                        <div className="glass-panel overflow-hidden rounded-[5px]">
                          {["Mr.", "Miss.", "Mrs."].map((t) => (
                            <div
                              key={t}
                              className="flex gap-2 items-center px-3 py-2 cursor-pointer"
                              onClick={() => {
                                setTitle(t);
                                setTitleMenu(false);
                              }}
                            >
                              <div className="border border-[#ddd] w-3 h-3 rounded-full flex justify-center items-center">
                                {title === t && (
                                  <div className="w-2 h-2 rounded-full bg-[#FFCD27]"></div>
                                )}
                              </div>
                              <h4 className="text-[15px]">{t}</h4>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control-one border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                    placeholder="Your first name"
                  />
                </div>
                {errors.fname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                )}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                    placeholder="Your last name"
                  />
                </div>
                {errors.lname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                )}
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="relative" onMouseLeave={() => setGenderMenu(false)}>
                  <div
                    className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200 cursor-pointer"
                    onClick={() => setGenderMenu(!genderMenu)}
                  >
                    <h4 className="text-[18px]">{gender === "" ? "Select" : gender}</h4>
                  </div>
                  <ChevronDown color="#FFCD27" className="h-5 w-5 absolute right-3 top-5.5" />
                  <AnimatePresence>
                    {genderMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 top-full z-50 w-full"
                      >
                        <div className="glass-panel overflow-hidden rounded-[5px]">
                          {["Male", "Female", "Non-binary", "Other"].map((g) => (
                            <div
                              key={g}
                              className="flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#28262c]"
                              onClick={() => GenderHandler(g)}
                            >
                              <div className="border border-[#ddd] w-3 h-3 rounded-full flex justify-center items-center">
                                {gender === g && (
                                  <div className="w-2 h-2 rounded-full bg-[#FFCD27]"></div>
                                )}
                              </div>
                              <h4 className="text-[15px]">{g}</h4>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div className="form-group" onMouseLeave={() => setOpen(false)}>
                <label>Date of Birth</label>
                <div className="relative">
                  <div
                    className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200 cursor-pointer"
                    onClick={() => setOpen((o) => !o)}
                  >
                    <h4 className="text-[18px]">
                      {selected ? formatDate(selected) : "Select date"}
                    </h4>
                  </div>
                  <CalendarDays color="#FFCD27" className="h-5 w-5 absolute right-3 top-5.5" />

                  {open && (
                    <div className="dob-panel">
                      <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={handleSelect}
                        defaultMonth={selected || new Date(toYear - 25, 0)}
                        captionLayout="dropdown"
                        startMonth={new Date(fromYear, 0)}
                        endMonth={new Date(toYear, 11)}
                        disabled={{ after: today }}
                        className="dob-daypicker"
                      />
                    </div>
                  )}
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>

              <div className="form-group">
                <label>Country</label>
                <div className="relative" onMouseLeave={() => setCountryMenu(false)}>
                  <div
                    className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200 cursor-pointer"
                    onClick={() => setCountryMenu(!CountryMenu)}
                  >
                    <h4 className="text-[18px]">
                      {country.title === "" ? "Select" : country.title}
                    </h4>
                  </div>
                  <ChevronDown color="#FFCD27" className="h-5 w-5 absolute right-3 top-5.5" />
                  <AnimatePresence>
                    {CountryMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 top-full z-50 w-full"
                      >
                        <div className="glass-panel overflow-hidden rounded-[5px]">
                          {countryList.map((item) => (
                            <div
                              className="flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#28262c]"
                              key={item.id}
                              onClick={() => CountryHandler(item)}
                            >
                              <div className="border border-[#ddd] w-3 h-3 rounded-full flex justify-center items-center">
                                {country.id === item.id && (
                                  <div className="w-2 h-2 rounded-full bg-[#FFCD27]"></div>
                                )}
                              </div>
                              <h4 className="text-[15px]">{item?.title}</h4>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              <div className="form-group">
                <label>City</label>
                {/* FIX: this whole block was rendering `country.title` and
                    mapping over `countryList`, so "City" was just a second,
                    broken Country dropdown. It now uses its own `city`
                    state and `cityList`. */}
                <div className="relative" onMouseLeave={() => setCityMenu(false)}>
                  <div
                    className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200 cursor-pointer"
                    onClick={() => setCityMenu(!cityMenu)}
                  >
                    <h4 className="text-[18px]">
                      {city.title === "" ? "Select" : city.title}
                    </h4>
                  </div>
                  <ChevronDown color="#FFCD27" className="h-5 w-5 absolute right-3 top-5.5" />
                  <AnimatePresence>
                    {cityMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 top-full z-50 w-full"
                      >
                        <div className="glass-panel overflow-hidden rounded-[5px]">
                          <div className="px-3 py-2">
                            <input type="text"
                            value={citysearch}
                              onChange={(e) => {
                                setCitysearch(e.target.value);
                                if (e.target.value === "") {
                                  setCityList([
                                    { id: 1, title: "Kolkata" },
                                    { id: 2, title: "Mumbai" },
                                    { id: 3, title: "Delhi" },
                                  ]);
                                  return;
                                }

                                const searchValue = e.target.value.toLowerCase();
                                const filteredCities = cityList.filter((item) =>
                                  item.title.toLowerCase().includes(searchValue)
                                );
                                setCityList(filteredCities);
                              }}
                            placeholder="Search city..." className="w-full border border-[#483228] rounded-[5px] bg-transparent px-3 py-3 focus:outline-none" 
                            
                            />
                          </div>
                          {cityList.map((item) => (
                            <div
                              className="flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#28262c]"
                              key={item.id}
                              onClick={() => CityHandler(item)}
                            >
                              <div className="border border-[#ddd] w-3 h-3 rounded-full flex justify-center items-center">
                                {city.id === item.id && (
                                  <div className="w-2 h-2 rounded-full bg-[#FFCD27]"></div>
                                )}
                              </div>
                              <h4 className="text-[15px]">{item?.title}</h4>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.2 }}
                className="mt-5 bg-[#FFCD27] text-[24px] text-[#150031] rounded-[30px] px-7 py-2 cursor-pointer"
                onClick={() => SubmitHandler()}
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-3"></div>
                    Loading...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
              {errors.submit && (
                <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
              )}
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:mt-0 mt-10">
            <AuthRight image="/artist2.png" />
          </div>
        </div>
      </div>

      <Modal isOpen={showOtp} onClose={() => setShowOtp(false)} closeOnBackdrop={false}>
        <OtpVerification
          type="email"
          identifier={formData.email}
          onClose={() => setShowOtp(false)}
          onVerify={async (code) => {
            const res = await fetch("/api/auth/verify-otp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code, type: "email" }),
            });
            if (!res.ok) throw new Error("Invalid code");
            setShowOtp(false);
          }}
          onResend={async () => {
            await fetch("/api/auth/resend-otp", { method: "POST" });
          }}
          onEditIdentifier={() => setShowOtp(false)}
        />
      </Modal>
      <Modal isOpen={showPhoneOtp} onClose={() => setShowPhoneOtp(false)} closeOnBackdrop={false}>
        <OtpVerification
          type="phone"
          identifier={formData.phone}
          onClose={() => setShowPhoneOtp(false)}
          onVerify={async (code) => {
            const res = await fetch("/api/auth/verify-otp", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code, type: "phone" }),
            });
            if (!res.ok) throw new Error("Invalid code");
            setShowPhoneOtp(false);
          }}
          onResend={async () => {
            await fetch("/api/auth/resend-otp", { method: "POST" });
          }}
          onEditIdentifier={() => setShowPhoneOtp(false)}
        />
      </Modal>

      <img src="/rg-shape.png" className="absolute bottom-0 left-0 right-0 z-[-1] w-full" />
    </div>
  );
}
