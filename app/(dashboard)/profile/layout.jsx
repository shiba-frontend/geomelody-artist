'use client'
import { useRouter } from "next/navigation";
import ProfileCard from "@/component/ProfileCard";

export default function ProfileLayout({children}){
    const router = useRouter();


    return (

             <div className="flex gap-3">
                    <div className="w-64">
                      <ProfileCard onSectionClick={(section) => router.push(section.path)} />
                    </div> 
                     <div className="w-[85%]">
                            <div className="rounded-3xl p-6 bg-[#411753] h-[calc(100vh-120px)]">
                                         {children}
                            </div>
                           
                     </div>
             </div>

    )
}