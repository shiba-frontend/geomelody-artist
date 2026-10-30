'use client'
import { Clock, MapPin, Plus } from "lucide-react";
import { useState } from "react";

const TABS = ["Published", "Approved", "Pending", "Drafted", "Rejected"];

const eventList = [
  {
  id:1,
  status:'Published',
  name:'Neon Horizon Tour: Live at Echo',
  date:'OCT 24, 2026',
  star_time:'20:00pm',
  end_time:'22:00pm',
  venue:'The Echo Dome, Los Angeles'
},
  {
  id:2,
  status:'Approved',
  name:'Neon Horizon Tour: Live at Echo',
  date:'OCT 24, 2026',
  star_time:'20:00pm',
  end_time:'22:00pm',
  venue:'The Echo Dome, Los Angeles'
}


]



export default function EventList(){
  const [activeTab, setActiveTab] = useState("Published");


  const tabCounts = {
    Published: eventList.filter((t) => t.status === "Published").length,
    Approved: eventList.filter((t) => t.status === "Approved").length,
    Pending: eventList.filter((t) => t.status === "Pending").length,
    Drafted: eventList.filter((t) => t.status === "Drafted").length,
    Rejected: eventList.filter((t) => t.status === "Rejected").length,
  };


   const visibleTracks = eventList.filter((t) => t.status === activeTab);

  function statusShow(stutus){
    return (
      <>
      {stutus == 'Published' && 
        <div className="bg-green-800 rounded-[30px] px-3 py-1">
            <h4 className="text-[#1BC50B]">Published</h4>
        </div>
      }

      {stutus == 'Approved' && 
        <div className="bg-yellow-800 rounded-[30px] px-3 py-1">
            <h4 className="text-[#FFCD27]">Approved</h4>
        </div>
      }

      </>
    )

  }


    return (
        <div className="rounded-3xl  border border-white/5 bg-card-gradient">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        

        <div className="flex bg-black/20 rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? "bg-[#900DA4] text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab} ({tabCounts[tab]})
            </button>
          ))}
        </div>
        <a href="/event/create-event" className="bg-white/10 rounded-[30px] px-4 py-2 cursor-pointer flex items-center gap-1"><Plus /> Create New Event</a>
      </div>

          <div className="grid grid-cols-3 gap-10 p-7">
            {visibleTracks.map((item)=>{
              return (
                <div key={item.id} className="bg-[#150031] rounded-[10px]">
                    <div className="relative">
                         <img src="/event.png" className="w-full h-80 rounded-tl-[10px] rounded-tr-[10px]" />
                          {item.status == 'Approved' &&
                          <button className="bg-white w-[200px] ml-auto mr-auto rounded-full text-black  cursor-pointer px-4 py-3 font-bold transition-color absolute bottom-5 left-0 right-0">
                            Change Cover Image
                          </button>
                       }
                        
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            {statusShow(item.status)}
                            <span className="text-[#FFCD27]">{item.date}</span>
                        </div>
                        <h3 className="font-bold text-[20px] mb-2">{item.name}</h3>
                          <h5 className="flex items-center gap-2 mb-1"><MapPin size={16} color="#FFCD27" /> {item.venue}</h5>
                          <h5 className="flex items-center gap-2 mb-5"><Clock size={16} color="#FFCD27" /> {item.star_time} - {item.end_time}</h5>
                          {item.status == 'Approved' &&
                          <button className="border border-white rounded-full w-full cursor-pointer px-3 py-3 font-bold transition-color hover:bg-white hover:text-black">
                            Publish My Event
                          </button>
                       }

                        </div>
                  </div>
              )
            })}


          </div>



        </div>
    )
}

