"use client"
import { TextAlignJustify, X } from "lucide-react";
import { useState } from "react";


export default function Header(){

    const [isToggle, setIsToggle] = useState(false)


    return (
        <div className="w-full px-4 md:px-8 mx-auto py-3">
            <div className="flex items-center py-3">
                <div className="lg:w-1/3 md:w-1/4 w-1/2">
                    <a href="/">
                         <img src="/logo.svg" />
                   </a>
                </div>
                <div className="lg:w-2/3 md:w-3/4 w-1/2 text-right">
                <button className="lg:hidden" onClick={()=>setIsToggle(!isToggle)}><TextAlignJustify /></button>
                    <ul className="justify-end lg:gap-5 gap-2 lg:flex hidden">
                        <li>
                            <a href="/" className="nav-bttn">Home</a>
                        </li>
                        <li>
                            <a href="#" className="nav-bttn">Feature</a>
                        </li>
                        <li>
                            <a href="#" className="nav-bttn">Resources</a>
                        </li>
                        <li>
                            <a href="#" className="nav-bttn">Help</a>
                        </li>
                         <li>
                            <a href="/login" className="login-bttn">Login</a>
                        </li>
                         <li>
                            <a href="/signup" className="get-bttn">Get Started</a>
                        </li>
                    </ul>
                    {isToggle &&
                    <div className="fixed top-0 left-0 right-0 lg:hidden bottom-0 bg-[#09001B] z-10 p-5">
                        <button onClick={()=>setIsToggle(false)}><X /></button>
                        <ul className="flex flex-col gap-3 justify-start text-left">
                             <li>
                            <a href="/" className="nav-bttn">Home</a>
                        </li>
                        <li>
                            <a href="#" className="nav-bttn">Feature</a>
                        </li>
                        <li>
                            <a href="#" className="nav-bttn">Resources</a>
                        </li>
                        <li>
                            <a href="#" className="nav-bttn">Help</a>
                        </li>
                         <li>
                            <a href="/login" className="login-bttn">Login</a>
                        </li>
                         <li>
                            <a href="/signup" className="get-bttn">Get Started</a>
                        </li>
                        </ul>
                    </div>
}
                </div>
            </div>
           
        </div>
    )
}