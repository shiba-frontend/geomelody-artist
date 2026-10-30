import { Check, ImageUp, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import PartnerMemberCard from "../music/PartnerMemberCard";
import ModalSide from "../ModalSide";
import { FileUploader } from "react-drag-drop-files";
import { AnimatePresence, motion } from "framer-motion";

export default function ArtistLineup({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {
  const [showModal, setShowModal] = useState(false);
  const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
  const [rawFile, setRawFile] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [artistMemberName, setArtistMemberName] = useState("");
  const [artistMemberDesignation, setartistMemberDesignation] = useState("");
  const [artistduration, setArtistduration] = useState("")
  const [membererrors, setMemberErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const [memberList, setmemberList] = useState([]);

  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
    onFieldChange(field, value);
  }


  const handleFile = (file) => {
     setMemberErrors("");
     setRawFile(file);
     setRawImage(URL.createObjectURL(file));
   };
 
   const handleTypeError = () => {
     setMemberErrors(`Please upload a ${FILE_TYPES.join(", ")} file.`);
   };

     function handleCreate() {
    const newErrors = {};
    if (!artistMemberName.trim()) newErrors.artistMemberName = `Name is required`;
    if (!artistMemberDesignation.trim()) newErrors.artistMemberDesignation = "Designation is required";
    if (!artistduration) newErrors.artistduration = "Duration is required";
    if (!rawFile) newErrors.cover = "Profile image is required";

    setMemberErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    var newitem = {
      id: Date.now(),
      name: artistMemberName.trim(),
      designation: artistMemberDesignation.trim(),
      profilepicture: rawFile,
      avatarUrl:rawImage,
      duration:artistduration
    }

    var updatedContent = [...memberList, newitem]

  setmemberList(updatedContent); 

  handleFieldChange("artistmember", updatedContent);

    resetForm();
   
  }

    // Save edited item
  function handleSave() {
     const newErrors = {};
   if (!artistMemberName.trim()) newErrors.artistMemberName = `Name is required`;
    if (!artistMemberDesignation.trim()) newErrors.artistMemberDesignation = "Designation is required";
    if (!rawFile) newErrors.cover = "Profile image is required";
     if (!artistduration) newErrors.artistduration = "Duration is required";
       setMemberErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    const memberData = {
      name: artistMemberName.trim(),
      designation: artistMemberDesignation.trim(),
      profilepicture: rawFile,
      avatarUrl: rawImage,
         duration:artistduration
    };


    const updatedList = editId
      ? memberList.map((item) =>
          item.id === editId ? { ...item, ...memberData } : item
        )
      : [...memberList, { id: Date.now(), ...memberData }];

      setmemberList(updatedList)

    handleFieldChange("artistmember", updatedList);
    resetForm();
  }

   

    function resetForm() {
    setArtistMemberName("");
    setartistMemberDesignation("");
    setArtistduration("")
    setRawFile(null);
    setRawImage(null);
    setMemberErrors({});
     setShowModal(false)
     setEditId(null)
  }




 






  return (
    <div>
      <h3 className="text-[24px] font-bold text-white mb-1">
        Artist & Lineup Details
      </h3>
      <p className="text-white/70 mb-5">Add your supporting artist</p>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
        <div className="form-group relative">
          <label>
            Performing Artist <span className="text-red-500">*</span>
          </label>
          <input
            readOnly
            type="text"
            value={data.leadArtist}
            onChange={(e) => handleFieldChange("artist", e.target.value)}
            className={`w-full bg-transparent border rounded-xl px-4 py-4 text-white placeholder-white/30 outline-none transition-colors ${
              errors.artist
                ? "border-red-500"
                : "border-white/20 focus:border-amber-400"
            }`}
            name="artist"
            placeholder="Enter artist name"
          />
          <span className="bg-[#1BC50B] text-black w-6 h-6 flex items-center justify-center rounded-full absolute right-4 top-12 transform ">
            <Check size={16} />
          </span>
        </div>
      </div>
      <div className="form-group relative">
        <label>Supporting Artist (optional)</label>
        <div className="grid grid-cols-4 gap-6 mb-10">
          {memberList.map((member, index) => {
            return (
              <PartnerMemberCard
                key={member.id}
                member={member}
                onEdit={(m) => {
                  setArtistMemberName(m.name);
                  setartistMemberDesignation(m.designation);
                  setArtistduration(m.duration)
                  setRawImage(m.avatarUrl || null);
                  setEditId(m.id);
                  setShowModal(true);
                  setRawFile(m.profilepicture);
                  setMemberErrors("");
                }}
                onRemove={(m) => {
                  const updatedContent = memberList.filter(
                    (x) => x.id !== m.id,
                  );
                  setmemberList(updatedContent);
                  handleFieldChange("artistmember", updatedContent);
                }}
              />
            );
          })}
          <div className="relative rounded-3xl border border-amber-400/40 py-3 flex justify-center items-center">
            <button
              className="flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Plus /> Add new Artist
            </button>
          </div>
        </div>
      </div>
      <ModalSide
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        closeOnBackdrop={false}
        size="md"
      >
        <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
          <h4 className="text-[18px] font-medium">
            {editId !== null
              ? "Edit Supporting Artist"
              : "Add Supporting Artist"}
          </h4>
          <button onClick={() => resetForm()} className="cursor-pointer">
            <X size={22} />
          </button>
        </div>
        <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          <div>
            <div className="form-group">
              <label>
                Artist Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={artistMemberName}
                onChange={(e) => {
                  setArtistMemberName(e.target.value);
                  if (e.target.value.trim()) {
                    setMemberErrors((prev) => ({
                      ...prev,
                      artistMemberName: "",
                    }));
                  }
                }}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
                  membererrors.artistMemberName
                    ? "border-red-500"
                    : "border-white/20 focus:border-amber-400"
                }`}
                placeholder="Enter artist name"
              />
              {membererrors.artistMemberName && (
                <p className="text-red-400 text-xs mt-1.5">
                  {membererrors.artistMemberName}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>
               Will Play <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={artistMemberDesignation}
                onChange={(e) => {
                  setartistMemberDesignation(e.target.value);
                  if (e.target.value.trim()) {
                    setMemberErrors((prev) => ({
                      ...prev,
                      artistMemberDesignation: "",
                    }));
                  }
                }}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
                  membererrors.artistMemberDesignation
                    ? "border-red-500"
                    : "border-white/20 focus:border-amber-400"
                }`}
                placeholder="Enter artist designation"
              />
              {membererrors.artistMemberDesignation && (
                <p className="text-red-400 text-xs mt-1.5">
                  {membererrors.artistMemberDesignation}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>
               Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={artistduration}
                onChange={(e) => {
                     const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
                  setArtistduration(numbersOnly);
                  if (e.target.value.trim()) {
                    setMemberErrors((prev) => ({
                      ...prev,
                      artistduration: "",
                    }));
                  }
                }}
                className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
                  membererrors.artistduration
                    ? "border-red-500"
                    : "border-white/20 focus:border-amber-400"
                }`}
                placeholder="In Mins"
              />
              {membererrors.artistduration && (
                <p className="text-red-400 text-xs mt-1.5">
                  {membererrors.artistduration}
                </p>
              )}
            </div>
            <div className="form-group">
              {rawImage ? (
                <div className="relative w-full overflow-hidden mx-auto">
                  <img
                    src={rawImage}
                    alt="Uploaded"
                    className="w-30 h-30 object-cover rounded-full"
                  />
                  <button
                    onClick={() => setRawImage(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 text-white cursor-pointer shadow-md"
                    aria-label="Remove image"
                  >
                    <Trash2 size={20} color="red" />
                  </button>
                </div>
              ) : (
                <FileUploader
                  handleChange={handleFile}
                  name="file"
                  types={FILE_TYPES}
                  onTypeError={handleTypeError}
                >
                  <div
                    className={`border-2 border-dashed rounded-2xl py-10 px-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-[#2D023D] ${
                      membererrors.cover
                        ? "border-red-500"
                        : "border-[#900DA4] hover:border-amber-400/60"
                    }`}
                  >
                    <ImageUp className="text-white/30" size={80} />
                    <p className="text-white/70 text-md text-center font-bold">
                      Drag or upload profile picture
                    </p>
                    <p className="text-white/70 text-sm text-center">
                      Prefer Size 500X500 | Max size 1mb
                    </p>
                    <p className="text-white/70 text-xs">
                      {FILE_TYPES.join(", ")}
                    </p>
                  </div>
                </FileUploader>
              )}
              {membererrors.cover && (
                <p className="text-red-400 text-xs mt-1.5">
                  {membererrors.cover}
                </p>
              )}
            </div>
          </div>

          {editId !== null ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="theme-bttn mt-auto self-end"
              onClick={handleSave}
            >
              Update
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="theme-bttn mt-auto self-end"
              onClick={handleCreate}
            >
              Save
            </motion.button>
          )}
        </div>
      </ModalSide>
    </div>
  );
}
