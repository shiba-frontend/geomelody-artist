'use client'
import { MoveUpRight } from "lucide-react";
import WelcomeCard from "@/component/WelcomeCard";
import RevenueChart from "@/component/RevenueChart";
import MusicAnalyticsCard from "@/component/MusicAnalyticsCard";
import DashboardRight from "@/component/DashboardRight";
import ListenersByCityCard from "@/component/ListenersByCityCard";
import UpcomingActivityCard from "@/component/UpcomingActivityCard";


export default function Dashboard(){
    return (
        <>

        {/* <div className="flex lg:flex-row flex-col gap-6 h-[calc(100vh-120px)]">
            <div className="w-[73%]">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                    <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3"><img src="/microphone.png" />  Total Listeners</h4>
                        <div className="flex items-center gap-3">
                            <h3 className="text-[22px] font-bold">50.8K</h3>
                            <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">28.4% <MoveUpRight size={10} /></span>
                        </div>
                    </div>
                    <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3"><img src="/microphone.png" />  Total Followers</h4>
                        <div className="flex items-center gap-3">
                            <h3 className="text-[22px] font-bold">50.8K</h3>
                            <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">28.4% <MoveUpRight size={10} /></span>
                        </div>
                    </div>
                    <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3"><img src="/microphone.png" />  Profile Views</h4>
                        <div className="flex items-center gap-3">
                            <h3 className="text-[22px] font-bold">50.8K</h3>
                            <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">28.4% <MoveUpRight size={10} /></span>
                        </div>
                    </div>
                    <div className="rounded-[10px] py-6 px-4 bg-card-gradient">
                        <h4 className="text-[18px] font-bold flex items-center gap-2 mb-3"><img src="/microphone.png" />  Total Streams</h4>
                        <div className="flex items-center gap-3">
                            <h3 className="text-[22px] font-bold">50.8K</h3>
                            <span className="flex items-center gap-1 bg-[#354738] text-[#1BC50B]  border border-[#447234] rounded-[3px] px-2 py-1 rounded-[30px] text-sm">28.4% <MoveUpRight size={10} /></span>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <div className="flex lg:flex-row flex-col gap-5">
                    <div className="w-1/3">
                        <ListenersByCityCard />
                    </div>
                     <div className="w-2/3">
                   <RevenueChart />
                    </div>
                </div>
                </div>
                <div className="flex lg:flex-row flex-col gap-5">
                    <div className="w-2/3">
                        <UpcomingActivityCard />
                    </div>
                     <div className="w-1/3">
                    <MusicAnalyticsCard />
                    </div>
                </div>
            </div>
            <div className="w-[27%]">
               <DashboardRight />
             </div>
        </div> */}

            


           <div className="flex items-center gap-5 py-7">
               <div className="w-2/3">
                     <WelcomeCard
                    name="Indranil"
                    profileCompletion={25}
                    onCompleteProfile={() => console.log("go to profile setup")}
                    onViewFeatures={() => console.log("show features modal")}
      />
               </div> 
                <div className="w-1/3">
                        <img src="/music.png" className="opacity-25" />

                </div>
        </div>
        </>
     


      
    )
}