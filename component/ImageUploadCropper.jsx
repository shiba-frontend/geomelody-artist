"use client";
// npm install react-drag-drop-files react-easy-crop

import { useState, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import Cropper from "react-easy-crop";
import { ImageUp, Trash2, UploadCloud, X } from "lucide-react";
import { getCroppedImg } from "./cropImage";

const FILE_TYPES = ["JPG", "JPEG", "PNG", "WEBP"];

export default function ImageUploadCropper({ onCropped, aspect = 1, cropShape,title, subtitle, requred }) {
 const [rawFile, setRawFile] = useState(null); // the original File object, as dropped
  const [rawImage, setRawImage] = useState(null); // object URL of the just-dropped file
  const [finalImage, setFinalImage] = useState(null); // cropped result, shown as preview
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
     setError("");
     setRawFile(file);
     setRawImage(URL.createObjectURL(file));
   };
 
   const handleTypeError = () => {
     setError(`Please upload a ${FILE_TYPES.join(", ")} file.`);
   };
 
   const onCropComplete = useCallback((_croppedArea, croppedPixels) => {
     setCroppedAreaPixels(croppedPixels);
   }, []);
 
   const handleConfirmCrop = async () => {
     try {
       const { blob, url } = await getCroppedImg(rawImage, croppedAreaPixels);
 
       // Wrap the cropped blob back into a real File so it carries a name/type
       // (blobs alone don't) — most upload SDKs and <input type="file"> based
       // flows expect a File, not a bare Blob.
       const croppedFile = new File(
         [blob],
         rawFile?.name ?? "cropped-image.jpg",
         { type: blob.type }
       );
 
       setFinalImage(url);
       onCropped?.(croppedFile, url, rawFile);
 
       setRawImage(null); // closes the crop modal
       setRawFile(null);
     } catch (err) {
       setError("Something went wrong cropping the image. Try again.");
     }
   };
 
   const handleCancelCrop = () => {
     setRawImage(null);
     setRawFile(null);
     setCrop({ x: 0, y: 0 });
     setZoom(1);
   };

  return (
    <div>
      {/* Preview after crop is confirmed */}
      {finalImage ? (
        cropShape == "rect" ?

        <div className="relative w-full h-80  overflow-hidden mx-auto">
        
          <img src={finalImage} alt="Uploaded" className="w-full h-full object-cover rounded-[10px]" />
          <button
            onClick={() => setFinalImage(null)}
            className="absolute top-2 right-2 bg-white rounded-full p-2 text-white cursor-pointer shadow-md"
            aria-label="Remove image"
          >
            <Trash2 size={20} color="red" />
          </button>
        </div>
        :
         <div className="relative w-full h-full rounded-[10px] overflow-hidden mx-auto">
        
          <img src={finalImage} alt="Uploaded" className="w-full h-62 object-cover" />
          <button
            onClick={() => setFinalImage(null)}
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
              {title} {requred && <span className="text-[red]">*</span>}
            </p>
             <p className="text-white/70 text-sm text-center">
              {subtitle}
            </p>
            <p className="text-white/70 text-xs">{FILE_TYPES.join(", ")}</p>
          </div>
        </FileUploader>
      )}

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      {/* Crop modal */}
      {rawImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1c0f2e] rounded-2xl overflow-hidden w-[50%]">
            <div className="relative w-full h-80 bg-black">
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape={cropShape}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="p-5">
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-amber-400"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleCancelCrop}
                  className="px-5 py-2 rounded-full text-white/70 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmCrop}
                  className="bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-sm px-6 py-2 rounded-full transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


