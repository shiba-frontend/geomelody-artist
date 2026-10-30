import { Check, ImageUp, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import PartnerMemberCard from "./PartnerMemberCard";
import ModalSide from "../ModalSide";
import { FileUploader } from "react-drag-drop-files";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_CONTENT = [
  {
    id: 1,
    title: "Sample from other artist",
    info: "Sample from other artist",
    ischeck: false,
  },
  {
    id: 2,
    title: "Contains explicit lyrics",
    info: "Contains explicit lyrics",
    ischeck: false,
  },
  {
    id: 3,
    title: "Third-part beats",
    info: "Sample from other artist",
    ischeck: false,
  },
  {
    id: 4,
    title: "Contains background vocals from others",
    info: "Sample from other artist",
    ischeck: false,
  },
  {
    id: 5,
    title: "Cover version / Remake",
    info: "Sample from other artist",
    ischeck: false,
  },
  {
    id: 6,
    title: "Other third-party content",
    info: "Sample from other artist",
    ischeck: false,
  },
];
export default function CopyRight({
  data,
  onChange,
  errors = {},
  onFieldChange,
}) {

  const [showModal, setShowModal] = useState(false)
  const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
 const [rawFile, setRawFile] = useState(null); 
  const [rawImage, setRawImage] = useState(null); 
  const [artistMemberName, setArtistMemberName] = useState("")
  const [artistMemberDesignation, setartistMemberDesignation] = useState("")
   const [membererrors, setMemberErrors] = useState({});
   const [editId, setEditId] = useState(null);

    const [memberList, setmemberList] = useState([]);


   const content = data.content && data.content.length ? data.content : DEFAULT_CONTENT;

   function handleFieldChange(field, value) {
    const updated = { ...data, [field]: value };
    onChange(updated);
    onFieldChange?.(field, value, updated);
  }

  function RadioHandle(val) {
    handleFieldChange("owncreate", val);
  }

  const CheckboxHandle = (selectedItem) => {
    const updatedContent = content.map((item) =>
      item.id === selectedItem.id ? { ...item, ischeck: !item.ischeck } : item
    );
    handleFieldChange("content", updatedContent);
  };

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
    if (!rawFile) newErrors.cover = "Profile image is required";

    setMemberErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    var newitem = {
      id: Date.now(),
      name: artistMemberName.trim(),
      designation: artistMemberDesignation.trim(),
      profilepicture: rawFile,
      avatarUrl:rawImage
    
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

       setMemberErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    const memberData = {
      name: artistMemberName.trim(),
      designation: artistMemberDesignation.trim(),
      profilepicture: rawFile,
      avatarUrl: rawImage,
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
    setRawFile(null);
    setRawImage(null);
    setMemberErrors({});
     setShowModal(false)
     setEditId(null)
  }





  return (
    <div>
      <h3 className="text-[24px] font-bold text-white mb-1">
        Right & Copyrights
      </h3>
      <p className="text-white/70 mb-5">Tell us who own rights to you music </p>

      <div className="flex justify-between items-center mb-10">
        <div
          className="flex  gap-3 cursor-pointer"
          onClick={() => RadioHandle("own")}
        >
          <div
            className={`h-7 w-7 rounded-full ${data.owncreate === "own" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}   border-6  flex justify-center items-center`}
          >
            
          </div>
          <div>
            <h4 className="text-[18px] leading-none mb-1">
              I own 100% of the rights
            </h4>
            <h5 className="text-white/50 text-sm">You can select one type</h5>
          </div>
        </div>
        <div
          className="flex  gap-3 cursor-pointer"
          onClick={() => RadioHandle("collaborator")}
        >
          <div
            className={`h-7 w-7 rounded-full ${data.owncreate === "collaborator" ? "bg-[#f2cd51] border-[#74543c]" : "bg-[#686868] border-[#454545]"}   border-6  flex justify-center items-center`}
          ></div>
          <div>
            <h4 className="text-[18px] leading-none mb-1">
              Co writer / Collaborator
            </h4>
            <h5 className="text-white/50 text-sm">
              This track is crated with others
            </h5>
          </div>
        </div>
        <div className="flex  gap-3 items-start">
          <img src="/shield.png" />
          <div>
            <h4 className="text-[18px] leading-none mb-1">
              Why is this important?
            </h4>
            <h5 className="text-white/50 text-sm">
              Copyright information helps us protect your <br></br>music and
              ensures you get paid correctly
            </h5>
          </div>
        </div>
      </div>
    {data.owncreate === "collaborator" && 
    <>
       <div className="grid grid-cols-4 gap-6 mb-10">
          {memberList.map((member, index) => {
            return (
              <PartnerMemberCard
                key={member.id}
                member={member}
               
                onEdit={(m) => {                
                  setArtistMemberName(m.name)
                  setartistMemberDesignation(m.designation)
                  setRawImage(m.avatarUrl || null)
                  setEditId(m.id)
                  setShowModal(true)
                  setRawFile(m.profilepicture)
                  setMemberErrors("")
                }}
                onRemove={(m) =>{
                  const updatedContent = memberList.filter((x) => x.id !== m.id);
                  setmemberList(updatedContent);
                  handleFieldChange("artistmember", updatedContent);
                }
                }
              />
            );
          })}
        <div className="relative rounded-3xl border border-amber-400/40 py-3 flex justify-center items-center">
            <button className="flex items-center justify-center gap-1 cursor-pointer" onClick={()=>setShowModal(true)}><Plus /> Add Partner Artist</button>
        </div>


        </div>
        {errors.artistmember && (
            <p className="text-red-400 text-xs mt-1.5 mb-2">{errors.artistmember}</p>
          )}
</>
        }

      <div className="mb-4">
        <h4 className="text-[18px] leading-none mb-1">
          Content Contains <span className="text-red-500">*</span>
        </h4>
        <h5 className="text-white/50 text-sm mb-8">
          Does your track contain any of the following?
        </h5>

        <div className="flex item-center flex-wrap">
          {content.map((item) => {
            return (
              <div className="w-100 flex items-center gap-3  relative mb-6 cursor-pointer" key={item.id} onClick={()=>CheckboxHandle(item)}>
                <div className="rounded-[2px] border border-[#fff] w-5 h-5">
                    {item.ischeck && 
                    <div className="rounded-[2px] w-5 h-5 bg-[#ffcd27] flex items-center justify-center"><Check size={12} color="#222" /></div>
                    }
                </div>
                <h4 className="flex gap-2 items-center text-[18px]">
                  {item.title}
                  <span className="group">
                    <img src="/clarity_help-info-line.png" />
                    <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 right-1/2 translate-x-1/2 bottom-full mb-2 whitespace-nowrap shadow-md z-10">
                     {item.info}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </span>
                </h4>
              </div>
            );
          })}
        </div>

{errors.content && (
            <p className="text-red-400 text-xs mt-1.5">{errors.content}</p>
          )}


      </div>

      <h4 className="text-[18px] leading-none mb-1">
          Give Credit (Optional)
        </h4>
        <h5 className="text-white/50 text-sm mb-2">
          Add details of anyone who contributed to this track
        </h5>
           <textarea
          value={data.credit}
          onChange={(e) => handleFieldChange("credit", e.target.value)}
          rows={3}
          placeholder="Type here"
          className="w-full bg-transparent border border-white/20 focus:border-amber-400 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors resize-none"
        />
    <div className="flex gap-3 mt-10  cursor-pointer" onClick={()=>handleFieldChange("confirm", !data.confirm)}>
      <div className="rounded-[2px] border border-[#fff] w-5 h-5" >
        {data.confirm && 
           <div className="rounded-[2px] w-5 h-5 bg-[#ffcd27] flex items-center justify-center " ><Check size={12} color="#222" /></div>
        }
           </div>
        <div>

            <h5 className="leading-none mb-1">I Confirmed that i have all nesseary rights and permission to distribute this track</h5>
            <h6 className="text-sm text-white/50">I agree not to upload any content that violates right of others</h6>
        </div>
</div>
{errors.confirm && (
            <p className="text-red-400 text-xs mt-1.5">{errors.confirm}</p>
          )}

          <ModalSide isOpen={showModal} onClose={() => setShowModal(false)} closeOnBackdrop={false} size="md">
    <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
      <h4 className="text-[18px] font-medium">{editId !== null ? 'Edit New Partner Artist' : 'Add New Partner Artist'}</h4>
      <button onClick={() => resetForm()} className="cursor-pointer">
        <X size={22} />
      </button>
    </div>
    <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
      <div>
        <div className="form-group">
          <label>Artist Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={artistMemberName}
              onChange={(e) => {
                setArtistMemberName(e.target.value);
                if (e.target.value.trim()) {
                  setMemberErrors((prev) => ({ ...prev, artistMemberName: "" }));
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
              <p className="text-red-400 text-xs mt-1.5">{membererrors.artistMemberName}</p>
            )}
      </div>
      <div className="form-group">
          <label>Artist Designation <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={artistMemberDesignation}
              onChange={(e) => {
                setartistMemberDesignation(e.target.value);
                if (e.target.value.trim()) {
                  setMemberErrors((prev) => ({ ...prev, artistMemberDesignation: "" }));
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
              <p className="text-red-400 text-xs mt-1.5">{membererrors.artistMemberDesignation}</p>
            )}
      </div>
      <div className="form-group">
        {rawImage ? 
         <div className="relative w-full overflow-hidden mx-auto">
        
          <img src={rawImage} alt="Uploaded" className="w-30 h-30 object-cover rounded-full" />
          <button
            onClick={() => setRawImage(null)}
            className="absolute top-2 right-2 bg-white rounded-full p-2 text-white cursor-pointer shadow-md"
            aria-label="Remove image"
          >
            <Trash2 size={20} color="red" />
          </button>
        </div>
          :
         <FileUploader
          handleChange={handleFile}
          name="file"
          types={FILE_TYPES}
          onTypeError={handleTypeError}
        >
          <div   className={`border-2 border-dashed rounded-2xl py-10 px-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-[#2D023D] ${
                    membererrors.cover
                      ? "border-red-500"
                      : "border-[#900DA4] hover:border-amber-400/60"
                  }`}>
           
            <ImageUp className="text-white/30" size={80} />
            <p className="text-white/70 text-md text-center font-bold">
              Drag or upload profile picture
            </p>
             <p className="text-white/70 text-sm text-center">
              Prefer Size 500X500 | Max size 1mb 
            </p>
            <p className="text-white/70 text-xs">{FILE_TYPES.join(", ")}</p>
          </div>
        </FileUploader>
}
{membererrors.cover && (
              <p className="text-red-400 text-xs mt-1.5">{membererrors.cover}</p>
            )}

      </div>
      </div>
      
      {
        editId !== null ? 
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
             onClick={handleSave}
            >
        
      Update
        
            </motion.button>
            :
              <motion.button
            whileHover={{ scale: 1.1 }}
            className="theme-bttn mt-auto self-end"
             onClick={handleCreate}
            >
        
      Save
        
            </motion.button>

      }
     
    </div>
</ModalSide>
    </div>
  );
}
