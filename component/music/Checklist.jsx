import { useRouter } from "next/navigation";

export default function Checklist(){

    const router = useRouter();






    
    return (
        <div>
            <h2 className="text-[24px] font-bold text-white mb-1">Review checklist</h2>
            <p className="text-white/70 mb-5">
                Check your submitted data
            </p>

             <div className="flex items-center bg-card-gradient rounded-[10px] p-6 mb-3 transition-transform duration-300 ease-in-out hover:scale-101">
                <div className="w-2/3 flex items-center gap-6">
                    <img src="/checklist-1.png" alt="checklist" className="w-8" />
                    <div>
                        <h4>Audio file</h4>
                        <h5 className="text-sm text-white/50">File format : MP3, 320 bits. File size: under 200mb</h5>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                    <span className="bg-green-700 rounded-[30px] px-7 py-1">Valid</span>
                    <button className="cursor-pointer">Edit</button>
                </div>
            </div>   
            <div className="flex items-center bg-card-gradient rounded-[10px] p-6 mb-3 transition-transform duration-300 ease-in-out hover:scale-101">
                <div className="w-2/3 flex items-center gap-6">
                    <img src="/checklist-2.png" alt="checklist" className="w-10" />
                    <div>
                        <h4>Cover Image</h4>
                        <h5 className="text-sm text-white/50">File format : JPG, 1000px X 100px. File size: under 2mb</h5>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                    <span className="bg-green-700 rounded-[30px] px-7 py-1">Valid</span>
                    <button className="cursor-pointer">Edit</button>
                </div>
            </div>

            <div className="flex items-center bg-card-gradient rounded-[10px] p-6 mb-3 transition-transform duration-300 ease-in-out hover:scale-101">
                <div className="w-2/3 flex items-center gap-6">
                    <img src="/checklist-3.png" alt="checklist" className="w-10" />
                    <div>
                        <h4>Artist Information</h4>
                        <h5 className="text-sm text-white/50">Name, Bio, Social Media link are completed</h5>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                    <span className="bg-green-700 rounded-[30px] px-7 py-1">Valid</span>
                    <button className="cursor-pointer" onClick={() => router.push("/profile/artist-identity")}>Edit</button>
                </div>
            </div>
            <div className="flex items-center bg-card-gradient rounded-[10px] p-6 mb-3 transition-transform duration-300 ease-in-out hover:scale-101">
                <div className="w-2/3 flex items-center gap-6">
                    <img src="/checklist-4.png" alt="checklist" className="w-10" />
                    <div>
                        <h4>Copyright Information</h4>
                        <h5 className="text-sm text-white/50">You informed you own all copyrights</h5>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                    <span className="bg-green-700 rounded-[30px] px-7 py-1">Valid</span>
                    <button className="cursor-pointer">Edit</button>
                </div>
            </div>
            <div className="flex items-center bg-card-gradient rounded-[10px] p-6 mb-3 transition-transform duration-300 ease-in-out hover:scale-101">
                <div className="w-2/3 flex items-center gap-6">
                    <img src="/checklist-5.png" alt="checklist" className="w-10" />
                    <div>
                        <h4>Meta Data</h4>
                        <h5 className="text-sm text-white/50">You added tags and your ISRC and UPC number</h5>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                    <span className="bg-green-700 rounded-[30px] px-7 py-1">Valid</span>
                    <button className="cursor-pointer">Edit</button>
                </div>
            </div> 
            <div className="flex items-center bg-card-gradient rounded-[10px] p-6 mb-3 transition-transform duration-300 ease-in-out hover:scale-101">
                <div className="w-2/3 flex items-center gap-6">
                    <img src="/checklist-6.png" alt="checklist" className="w-10" />
                    <div>
                        <h4>Release Date</h4>
                        <h5 className="text-sm text-white/50">You confirmed your music release date</h5>
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-between">
                    <span className="bg-green-700 rounded-[30px] px-7 py-1">Valid</span>
                    <button className="cursor-pointer">Edit</button>
                </div>
            </div>  
        </div>
    )
}