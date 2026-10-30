"use client";

import { useState } from "react";
import { ImageUp, Plus, Trash2, X } from "lucide-react";
import ModalSide from "../ModalSide";
import { FileUploader } from "react-drag-drop-files";

// In a real app this would come from an API call, e.g.:
//   const { data: albums } = useQuery({ queryKey: ["albums"], queryFn: musicApi.getAlbums })
// Kept as local state here so the component works standalone; swap the
// initial value + setAlbumList calls for your actual fetch/mutation.
function CreateAlbumModal({ isOpen, onClose, releaseType, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // FIX: one shared `error` string meant "Description is required" could
  // render under the Title field too (both checked `{error && ...}`), and
  // fixing one field would clear an error that was actually about a
  // completely different field. Split into a per-field errors object.
  const [errors, setErrors] = useState({});

  const [rawFile, setRawFile] = useState(null);
  const [rawImage, setRawImage] = useState(null);

  const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];
  const MAX_SIZE_MB = 1;

  const handleFile = (file) => {
    setErrors((prev) => ({ ...prev, cover: "" }));
    setRawFile(file);
    setRawImage(URL.createObjectURL(file));
  };

  const handleTypeError = () => {
    setErrors((prev) => ({
      ...prev,
      cover: `Please upload a ${FILE_TYPES.join(", ")} file.`,
    }));
  };

  // FIX: "Max size 1mb" was just decorative text before — nothing enforced
  // it. react-drag-drop-files supports this natively via maxSize + onSizeError,
  // no manual byte-checking needed.
  const handleSizeError = () => {
    setErrors((prev) => ({
      ...prev,
      cover: `File is too large — max ${MAX_SIZE_MB}MB.`,
    }));
  };

  function resetForm() {
    setTitle("");
    setDescription("");
    setRawFile(null);
    setRawImage(null);
    setErrors({});
  }

  // FIX: previously only the successful "Create" path reset state — closing
  // via Cancel or the X button left stale title/description/image behind
  // the next time the modal opened.
  function handleClose() {
    resetForm();
    onClose();
  }

  function handleCreate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = `${releaseType} name is required`;
    if (!description.trim()) newErrors.description = "Description is required";
    if (!rawFile) newErrors.cover = "Cover image is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onCreate({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      coverImage: rawFile,
    });
    resetForm();
    onClose();
  }

  return (
    <ModalSide isOpen={isOpen} onClose={handleClose} closeOnBackdrop={false} size="md">
      <div className="bg-[#900DA4] flex items-center justify-between px-4 py-5">
        <h4 className="text-[18px] font-medium">Create New {releaseType}</h4>
        <button onClick={handleClose} className="cursor-pointer">
          <X size={22} />
        </button>
      </div>

      <div className="px-5 py-6 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
        <div>
          <div className="form-group">
            <label>
              {releaseType} Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, title: "" }));
                }
              }}
              placeholder={`e.g. My First ${releaseType}`}
              className={`w-full bg-transparent border rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
                errors.title
                  ? "border-red-500"
                  : "border-white/20 focus:border-amber-400"
              }`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1.5">{errors.title}</p>
            )}
          </div>

          <div className="form-group">
            <label>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, description: "" }));
                }
              }}
              className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            {rawImage ? (
              <div className="relative w-full overflow-hidden mx-auto">
                <img
                  src={rawImage}
                  alt="Uploaded"
                  className="w-30 h-30 object-cover rounded-[10px]"
                />
                <button
                  onClick={() => {
                    setRawImage(null);
                    setRawFile(null);
                  }}
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
                maxSize={MAX_SIZE_MB}
                onTypeError={handleTypeError}
                onSizeError={handleSizeError}
              >
                <div
                  className={`border-2 border-dashed rounded-2xl py-10 px-6 flex flex-col items-center gap-2 cursor-pointer transition-colors bg-[#2D023D] ${
                    errors.cover
                      ? "border-red-500"
                      : "border-[#900DA4] hover:border-amber-400/60"
                  }`}
                >
                  <ImageUp className="text-white/30" size={80} />
                  <p className="text-white/70 text-md text-center font-bold">
                    Drag or upload cover image for your {releaseType}
                  </p>
                  <p className="text-white/70 text-sm text-center">
                    Prefer Size 100X100 | Max size {MAX_SIZE_MB}mb
                  </p>
                  <p className="text-white/70 text-xs">{FILE_TYPES.join(", ")}</p>
                </div>
              </FileUploader>
            )}
            {errors.cover && (
              <p className="text-red-400 text-xs mt-1.5">{errors.cover}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <button
            onClick={handleClose}
            className="flex-1 bg-white/10 hover:bg-white/15 text-white/80 text-sm py-2.5 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-sm py-2.5 rounded-full transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </ModalSide>
  );
}

export default function AlbumEpSelector({
  releaseType, // "Album" | "EP" — caller only renders this when relevant
  fieldName, // "albumId" | "epId" — which key this writes back to form data
  selectedId,
  onSelect,
  error,
}) {
  // Keeps Album's list and EP's list completely separate — switching
  // releaseType from Album to EP shows EP's own list, not Album's.
  // In a real app, replace this with two separate queries, e.g.:
  //   useQuery({ queryKey: ["albums"], queryFn: musicApi.getAlbums })
  //   useQuery({ queryKey: ["eps"], queryFn: musicApi.getEps })
  const [listsByType, setListsByType] = useState({ Album: [], EP: [] });
  const [modalOpen, setModalOpen] = useState(false);

  const list = listsByType[releaseType] || [];
  const hasList = list.length > 0;

  function handleCreated(newItem) {
    setListsByType((prev) => ({
      ...prev,
      [releaseType]: [...prev[releaseType], newItem],
    }));
    onSelect(newItem.id); // auto-select the one just created
  }

  return (
    <div className="col-span-2">
      <label className="block text-white/70 text-sm mb-2">
        Select {releaseType}
      </label>

      <div className="flex gap-3">
        {hasList && (
          <select
            value={selectedId || ""}
            onChange={(e) => onSelect(e.target.value)}
            className={`flex-1 bg-[#2a1440] border rounded-xl px-4 py-3 text-white outline-none transition-colors ${
              error ? "border-red-500" : "border-white/20 focus:border-amber-400"
            }`}
          >
            <option value="">Select {releaseType.toLowerCase()}</option>
            {list.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`flex items-center gap-2 border border-dashed border-amber-400/50 hover:border-amber-400 text-amber-400 text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer ${
            hasList ? "" : "flex-1 justify-center"
          }`}
        >
          <Plus size={16} />
          Create {releaseType}
        </button>
      </div>

      {!hasList && (
        <p className="text-white/40 text-xs mt-1.5">
          You don't have any {releaseType.toLowerCase()}s yet — create one to continue.
        </p>
      )}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}

      <CreateAlbumModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        releaseType={releaseType}
        onCreate={handleCreated}
      />
    </div>
  );
}
