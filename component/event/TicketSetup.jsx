import { ENTRY_WITH_OPTIONS, validateTicketDraft, WRISTBAND_COLORS, WRISTBAND_ENTRY } from "@/lib/validation/ticketing";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
const EMPTY_DRAFT = {
  category: "",
  price: "",
  quantity: "",
  entryWith: "",
  wristbandColor: "",
};
const CURRENCY_SYMBOL = "$";
const GRID = "lg:grid-cols-[2.2fr_1.2fr_1.2fr_1.2fr_1.2fr_40px]";

const pill = " bg-white/10 rounded-2xl px-5 py-4 text-white";
const inputClass = `w-full ${pill} placeholder-white/70 outline-none transition-shadow`;
function sanitizePrice(raw) {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  if (rest.length === 0) return whole;
  return `${whole}.${rest.join("").slice(0, 2)}`;
}

function formatPrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

function PillSelect({ value, options, placeholder, onChange, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 text-left ${pill} ${
          hasError ? "ring-1 ring-red-500" : ""
        }`}
      >
        <span className={value ? "text-white" : "text-white/70"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-[#2a1440] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                option === value
                  ? "text-amber-400 bg-white/5"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TicketSetup({
     data,
  onChange,
  errors = {},
  onFieldChange,
}){

  const tickets = data.tickets || [];

  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [draftErrors, setDraftErrors] = useState({});
  const categoryRef = useRef(null);

  function handleFieldChange(field, value) {
    const updated = { ...data, [field]: value };
    onChange(updated);
    onFieldChange?.(field, value, updated);
  }
  function updateDraft(field, value) {
    setDraft((d) => {
      const next = { ...d, [field]: value };
      // Switching away from Wrist Band drops the color that went with it
      if (field === "entryWith" && value !== WRISTBAND_ENTRY) {
        next.wristbandColor = "";
      }
      return next;
    });
    // Editing a field clears just that field's error
    setDraftErrors((e) => {
      const next = { ...e, [field]: "" };
      if (field === "entryWith") next.wristbandColor = "";
      return next;
    });
  }

  function handleAdd() {
    const found = validateTicketDraft(draft, tickets);
    setDraftErrors(found);
    if (Object.keys(found).length > 0) return;

    const newTicket = {
      id: Date.now(),
      category: draft.category.trim(),
      price: Number(draft.price),
      quantity: Number(draft.quantity),
      entryWith: draft.entryWith,
      wristbandColor:
        draft.entryWith === WRISTBAND_ENTRY ? draft.wristbandColor : "",
    };

    // Compute the new list once, send it up once.
    const updatedList = [...tickets, newTicket];
    handleFieldChange("tickets", updatedList);

    setDraft(EMPTY_DRAFT);
    categoryRef.current?.focus();
  }

  function handleRemove(ticketId) {
    const updatedList = tickets.filter((t) => t.id !== ticketId);
    handleFieldChange("tickets", updatedList);
  }

  function handleEnter(e) {
    if (e.key === "Enter") handleAdd();
  }

  const errorRing = (field) =>
    draftErrors[field]
      ? "ring-1 ring-red-500"
      : "focus:ring-1 focus:ring-amber-400";




    return (
        <div>
      <h3 className="text-[24px] font-bold text-white mb-1">Ticket Setup</h3>
      <p className="text-white/70 mb-5">Ticket price setup</p>


        <div className="flex gap-10">
              <div className="flex gap-3 mb-4 cursor-pointer" onClick={()=>handleFieldChange("ticketType", 'paid')}>
          <div className={`h-7 w-7 rounded-full  ${data.ticketType === "paid" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
          >
            
          </div>
          <div>
              <h4 className="leading-none">Paid Event</h4>
              <h5 className="text-[12px] text-white/50">
                Payable Amount
              </h5>
            </div>
        </div>
        <div className="flex gap-3 mb-4 cursor-pointer" onClick={()=>handleFieldChange("ticketType", 'free')}>
          <div className={`h-7 w-7 rounded-full  ${data.ticketType === "free" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}  border-6  flex justify-center items-center`}
          >
            
          </div>
          <div>
              <h4 className="leading-none">Free Event</h4>
              <h5 className="text-[12px] text-white/50">
                It is free event 
              </h5>
            </div>
        </div>
        </div>
        <div className="flex items-center gap-5 bg-white/15 rounded-xl p-5 mb-5">
            <img src="/hugeicons_affiliate.png" />
            <div>
                <h3 className="text-[24px] font-semibold">Commission Information</h3>
                <p>Geomelody will take 7% commission from you each ticket (Exp: For a $100 ticket- $7 is for geomelody and $93 is for you)</p>
            </div>
        </div>




        {/* Add row */}
      <div
        className={`grid grid-cols-1 ${GRID} gap-3 items-start rounded-2xl bg-[#391151] p-3 mb-3`}
      >
        <div>
          <input
            ref={categoryRef}
            type="text"
            maxLength={30}
            value={draft.category}
            onChange={(e) => updateDraft("category", e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Ticket Category"
            className={`${inputClass} ${errorRing("category")}`}
          />
          {draftErrors.category && (
            <p className="text-red-400 text-xs mt-1 ml-2">
              {draftErrors.category}
            </p>
          )}
        </div>

        <div>
          <div
            className={`flex items-center gap-2 ${pill} focus-within:ring-1 focus-within:ring-amber-400 ${
              draftErrors.price ? "ring-1 ring-red-500" : ""
            }`}
          >
            {draft.price && <span>{CURRENCY_SYMBOL}</span>}
            <input
              type="text"
              inputMode="decimal"
              value={draft.price}
              onChange={(e) => updateDraft("price", sanitizePrice(e.target.value))}
              onKeyDown={handleEnter}
              placeholder="Price"
              className="w-full bg-transparent outline-none placeholder-white/70"
            />
          </div>
          {draftErrors.price && (
            <p className="text-red-400 text-xs mt-1 ml-2">{draftErrors.price}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={7}
            value={draft.quantity}
            onChange={(e) =>
              updateDraft("quantity", e.target.value.replace(/\D/g, ""))
            }
            onKeyDown={handleEnter}
            placeholder="Quantity"
            className={`${inputClass} ${errorRing("quantity")}`}
          />
          {draftErrors.quantity && (
            <p className="text-red-400 text-xs mt-1 ml-2">
              {draftErrors.quantity}
            </p>
          )}
        </div>

        <div>
          <PillSelect
            value={draft.entryWith}
            options={ENTRY_WITH_OPTIONS}
            placeholder="Entry With"
            onChange={(v) => updateDraft("entryWith", v)}
            hasError={!!draftErrors.entryWith}
          />
          {draftErrors.entryWith && (
            <p className="text-red-400 text-xs mt-1 ml-2">
              {draftErrors.entryWith}
            </p>
          )}
        </div>

        {/* Color only appears once Wrist Band is chosen; otherwise an empty
            cell keeps the grid columns aligned with the saved rows. */}
        {draft.entryWith === WRISTBAND_ENTRY ? (
          <div>
            <PillSelect
              value={draft.wristbandColor}
              options={WRISTBAND_COLORS}
              placeholder="Color"
              onChange={(v) => updateDraft("wristbandColor", v)}
              hasError={!!draftErrors.wristbandColor}
            />
            {draftErrors.wristbandColor && (
              <p className="text-red-400 text-xs mt-1 ml-2">
                {draftErrors.wristbandColor}
              </p>
            )}
          </div>
        ) : (
          <div />
        )}

        <div className="h-[58px] flex items-center justify-center">
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Add ticket category"
            className="w-7 h-7 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center transition-colors"
          >
            <Plus size={18} strokeWidth={3} className="text-[#2a1440]" />
          </button>
        </div>
      </div>

      {/* Saved categories */}
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className={`grid grid-cols-1 ${GRID} gap-3 items-center rounded-2xl bg-[#391151] p-3 mb-5`}
        >
          <div className={pill}>{ticket.category}</div>
          <div className={pill}>
            {CURRENCY_SYMBOL} {formatPrice(ticket.price)}
          </div>
          <div className={pill}>{ticket.quantity}</div>
          <div className={pill}>{ticket.entryWith}</div>
          {ticket.wristbandColor ? (
            <div className={pill}>{ticket.wristbandColor}</div>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={() => handleRemove(ticket.id)}
            aria-label={`Remove ${ticket.category}`}
            className="flex items-center justify-center text-red-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      {errors.tickets && (
        <p className="text-red-400 text-xs mt-1.5">{errors.tickets}</p>
      )}


      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            <div className="form-group">
          <label>
            Early bird Discount (%)
          </label>
          <input
            type="text"
            value={data.earlyBirdDiscount ?? ""}
            onChange={(e) => handleFieldChange("earlyBirdDiscount", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.earlyBirdDiscount
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            placeholder="Add"
          />
         
        </div>

              <div className="form-group relative">
                <label>
                  Discount End Date
                </label>
                <DatePicker
                  selected={data.earlyBirdDiscountDate}
                  onChange={(date) => handleFieldChange("earlyBirdDiscountDate", date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select date"
                  className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
                    errors.earlyBirdDiscountDate
                      ? "border-red-500"
                      : "border-white/20 focus:border-amber-400"
                  }`}
                />
      
                
              </div>
             
            </div>
           


      </div>
    )
}