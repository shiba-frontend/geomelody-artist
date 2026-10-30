'use client'
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react"
import { useAppStore } from "@/hooks/useAppStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ArtistIdentity(){
   const router = useRouter();
     const searchParams = useSearchParams();
    const artistTypes = searchParams.get("type") || "solo";




const [likeSing, setLikeSing] = useState([
    {
        id:1,
        title:'Pop',
        ischeck:false
    },
    {
        id:2,
        title:'Rock',
        ischeck:false
    },
     {
        id:3,
        title:'Hip-Hop',
        ischeck:false
    },
     {
        id:4,
        title:'Classical',
        ischeck:false
    },
     {
        id:5,
        title:'Rapper',
        ischeck:false
    },
     {
        id:6,
        title:'Jazz',
        ischeck:false
    },
     {
        id:7,
        title:'Folk',
        ischeck:false
    },
    {
        id:8,
        title:'DJ',
        ischeck:false
    },
    {
        id:9,
        title:'Electronic',
        ischeck:false
    },
])

const [artistSelf, setArtistSelf] = useState([
    {
        id:1,
        title:'Singer',
        ischeck:false
    },
    {
        id:2,
        title:'Composer',
        ischeck:false
    },
     {
        id:3,
        title:'Lyricist',
        ischeck:false
    },
     {
        id:4,
        title:'Rapper',
        ischeck:false
    },
     {
        id:5,
        title:'DJ',
        ischeck:false
    },
     {
        id:6,
        title:'Remixer',
        ischeck:false
    },
     {
        id:7,
        title:'Electronic Music Artist',
        ischeck:false
    },
])

const [artistPlay, setArtistPlay] = useState([
    {
        id:1,
        title:'Guitar',
        ischeck:false
    },
    {
        id:2,
        title:'Piano',
        ischeck:false
    },
     {
        id:3,
        title:'Flute',
        ischeck:false
    },
     {
        id:4,
        title:'Dram',
        ischeck:false
    },
     
])


const SingCheckboxHandle = (selectedItem)=>{
     setLikeSing((prev) =>
        prev.map((item) =>
            item.id === selectedItem.id
                ? { ...item, ischeck: !item.ischeck }
                : item
        )
    )

}
const SelfCheckboxHandle = (selectedItem)=>{
     setArtistSelf((prev) =>
        prev.map((item) =>
            item.id === selectedItem.id
                ? { ...item, ischeck: !item.ischeck }
                : item
        )
    )

}

const PlayCheckboxHandle = (selectedItem)=>{
     setArtistPlay((prev) =>
        prev.map((item) =>
            item.id === selectedItem.id
                ? { ...item, ischeck: !item.ischeck }
                : item
        )
    )

}






    return (
        <div className="flex flex-col h-full">
            <div>
            <div className="w-full rounded-full h-1 bg-[#a3a3a3] mb-5">
                <div className="h-1 rounded-full" style={{width:'25%', background:'linear-gradient(103deg,rgba(27, 197, 11, 1) 0%, rgba(226, 255, 223, 1) 100%)'}}></div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                <div className="form-group flex items-center gap-5">
                    <div className="flex gap-2 items-center cursor-pointer" onClick={()=>{
                       router.push("/profile/artist-identity?type=solo")
                        }}>
                        <div className={`w-4 h-4 rounded-full border ${artistTypes == 'solo' ? 'border-[#FFCD27]' :'border-white'} flex justify-center items-center`}>
                            {artistTypes == 'solo' &&  <div className="w-2.5 h-2.5 bg-[#FFCD27] rounded-full"></div>}
                        </div>
                        <h4 className="text-[18px] font-medium">I am Solo Artist</h4>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer" onClick={()=>{router.push("/profile/artist-identity?type=band")}}>
                        <div className={`w-4 h-4 rounded-full border ${artistTypes == 'band' ? 'border-[#FFCD27]' :'border-white'} flex justify-center items-center`}>
                              {artistTypes == 'band' &&  <div className="w-2.5 h-2.5 bg-[#FFCD27] rounded-full"></div>}
                        </div>
                        <h4 className="text-[18px] font-medium">We have Music Band</h4>
                    </div>
                </div>
                   <div className="form-group relative">
                        <label>My Stage Name</label>
                          <input
                  type="text"
                  name="stage"
                  className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"
                  placeholder="Your stage name"
                />
                <motion.button          
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#900DA4] px-6 py-2 rounded-[30px] cursor-pointer absolute right-3 top-12"
                  >
                    Check Availability
                  </motion.button>
                   </div>
            </div>
             <div className="form-group relative">
                <label>My Bio</label>
                <textarea rows={'4'} placeholder="Maximum 100 words" className="form-control-two border border-[#483228] focus:border-[#FFCD27] focus:outline-none transition-colors duration-200"></textarea>
             </div>
             <div className="form-group relative flex items-center gap-5 border-b border-white/10 pb-6">
             {
                artistTypes === 'solo' ?
                <h5 className="font-bold">I Like to Sing :</h5>
                :
                <h5 className="font-bold">We Like to Sing :</h5>

             }
                
                <div className="flex items-center gap-5 flex-wrap">
                    {likeSing.map((item)=>{
                        return (
                            <div key={item.id} className="flex items-center gap-2 cursor-pointer" onClick={()=>SingCheckboxHandle(item)}>
                                <div className={`border ${item.ischeck ? 'border-[#ffcd27]' : 'border-[#fff]' } rounded-[2px] w-4 h-4`}>
                                    {item.ischeck && 
                                    <div className="rounded-[2px] w-4 h-4 bg-[#ffcd27] flex items-center justify-center"><Check size={12} color="#222" /></div>
                                    }
                                </div>
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })}
                    <div>

                    </div>
                </div>
             </div>
             { artistTypes === 'solo' &&
              <div className="form-group relative flex items-center gap-5 border-b border-white/10 pb-6">
                <h5 className="font-bold">I am also :</h5>
                <div className="flex items-center gap-5 flex-wrap">
                    {artistSelf.map((item)=>{
                        return (
                            <div key={item.id} className="flex items-center gap-2 cursor-pointer" onClick={()=>SelfCheckboxHandle(item)}>
                                <div className={`border ${item.ischeck ? 'border-[#ffcd27]' : 'border-[#fff]' } rounded-[2px] w-4 h-4`}>
                                    {item.ischeck && 
                                    <div className="rounded-[2px] w-4 h-4 bg-[#ffcd27] flex items-center justify-center"><Check size={12} color="#222" /></div>
                                    }
                                </div>
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })}
                    <div>

                    </div>
                </div>
             </div>
}
    { artistTypes === 'solo' &&
             <div className="form-group relative flex items-center gap-5">
                <h5 className="font-bold">I Like to Play :</h5>
                <div className="flex items-center gap-5 flex-wrap">
                    {artistPlay.map((item)=>{
                        return (
                            <div key={item.id} className="flex items-center gap-2 cursor-pointer" onClick={()=>PlayCheckboxHandle(item)}>
                                <div className={`border ${item.ischeck ? 'border-[#ffcd27]' : 'border-[#fff]' } rounded-[2px] w-4 h-4`}>
                                    {item.ischeck && 
                                    <div className="rounded-[2px] w-4 h-4 bg-[#ffcd27] flex items-center justify-center"><Check size={12} color="#222" /></div>
                                    }
                                </div>
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })}
                    <div>

                    </div>
                </div>
             </div>
}
             </div>
             <motion.button
                               whileHover={{ scale: 1.1 }}
                               className="theme-bttn mt-auto self-end"
                             >
                          
                          Save & Continue
                          
                             </motion.button>
        </div>
    )
}