"use client";
import BandMemberCard from "@/component/BandMemberCard";
import ModalSide from "@/component/ModalSide";
import { AnimatePresence, motion } from "framer-motion";
import { ImageUp, Plus, X } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
export default function BandMembers() {
  const [showModal, setShowModal] = useState(false);
  const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
  const [rawFile, setRawFile] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [error, setError] = useState("");

  const [memberList, setmemberList] = useState([
    {
      name: "Sourav Chetri",
      role: "Lead Singer",
      avatarUrl: "",
      active: true,
      id:1
    },
  ]);

  const handleFile = (file) => {
    setError("");
    setRawFile(file);
    setRawImage(URL.createObjectURL(file));
  };

  const handleTypeError = () => {
    setError(`Please upload a ${FILE_TYPES.join(", ")} file.`);
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <div className="w-full rounded-full h-1 bg-[#a3a3a3] mb-5">
          <div
            className=" h-1 rounded-full"
            style={{
              width: "50%",
              background:
                "linear-gradient(103deg,rgba(27, 197, 11, 1) 0%, rgba(226, 255, 223, 1) 100%)",
            }}
          ></div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h4 className="text-[22px] font-medium">Our Band Members</h4>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Plus />
            Add new Member
          </motion.button>
        </div>
<div className="grid grid-cols-4 gap-6">
        {memberList.map((member, index) => {
          return (
            <BandMemberCard
              key={member.id}
              member={member}
              onToggleActive={(m) =>
                setmemberList((prev) =>
                  prev.map((x) =>
                    x.id === m.id ? { ...x, active: !x.active } : x,
                  ),
                )
              }
              onEdit={(m) => console.log("edit", m)}
              onRemove={(m) =>
                setmemberList((prev) => prev.filter((x) => x.id !== m.id))
              }
            />
          );
        })}
      </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="theme-bttn mt-auto self-end"
      >
        Save & Continue
      </motion.button>
      <ModalSide
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        closeOnBackdrop={false}
        size="md"
      >
        <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
          <h4 className="text-[18px] font-medium">Add New Social Platform</h4>
          <button
            onClick={() => setShowModal(false)}
            className="cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>
        <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)]" overflow-y-auto>
          <div>
            <div className="form-group">
              <label>
                Member Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                placeholder="Enter member name"
              />
            </div>
            <div className="form-group">
              <label>
                Member Role<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                placeholder="Enter member role"
              />
            </div>
            <div className="form-group">
              {rawImage ? (
                <div className="relative w-full overflow-hidden mx-auto">
                  <img
                    src={rawImage}
                    alt="Uploaded"
                    className="w-15 h-15 object-cover rounded-[10px]"
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
                  <div className="border-2 border-dashed border-[#900DA4] hover:border-amber-400/60 rounded-2xl py-10 px-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-[#2D023D]">
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
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
          >
            Save & Continue
          </motion.button>
        </div>
      </ModalSide>
    </div>
  );
}
