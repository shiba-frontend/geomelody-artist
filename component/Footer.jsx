export default function Footer(){
    return (
     
             <div className="w-full px-4 md:px-8 mx-auto py-15 bg-[#0F002D]">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                    <div className="lg:mb-0 mb-10">
                        <a href="/" >
                            <img src="/logo.svg" alt="logo" className="mb-7"/>
                        </a>
                        <h3 className="lg:text-[24px] text-[18px] mb-2 text-[rgba(255,255,255,0.7)]">Follow us on </h3>
                        <div className="flex gap-3">
                             <a href="#">
                                <img src="/mynaui_facebook.svg" alt="fb" />
                            </a>
                            <a href="#">
                                <img src="/proicons_instagram.svg" alt="fb" />
                            </a>
                            <a href="#">
                                <img src="/codicon_twitter.svg" alt="fb" />
                            </a>
                            <a href="#">
                                <img src="/proicons_tiktok.svg" alt="fb" />
                            </a>
                            <a href="#">
                                <img src="/basil_linkedin-outline.svg" alt="fb" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="lg:text-[24px] text-[18px] text-[rgba(255,255,255,0.7)] mb-7">Quick Link</h3>
                        <ul className="footer-widget">
                            <li>
                                <a href="#">About</a>
                            </li>
                             <li>
                                <a href="#">Press & Media</a>
                            </li>
                             <li>
                                <a href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="lg:text-[24px] text-[18px] text-[rgba(255,255,255,0.7)] mb-7">Important Link</h3>
                        <ul className="footer-widget">
                            <li>
                                <a href="#">FAQ’s</a>
                            </li>
                             <li>
                                <a href="#">Privacy Policies</a>
                            </li>
                             <li>
                                <a href="#">Cookie Policies</a>
                            </li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="lg:text-[24px] text-[18px] text-[rgba(255,255,255,0.7)] mb-7">Get the App From</h3>
                        <ul className="flex gap-3">
                            <li>
                                <a href="#">
                                    <img src="/playstore.png" alt="fb" />
                                </a>
                            </li>
                             <li>
                                <a href="#">
                                     <img src="/appstore.png" alt="fb" />
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
             </div>
        
    )
}