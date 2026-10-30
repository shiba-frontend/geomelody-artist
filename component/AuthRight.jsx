export default function AuthRight({image}){
    return (
        <div className="lg:pl-40">
            <img src={image} alt="artist" className="z-[-1] relative w-[70%] ml-auto mr-auto lg:block hidden opacity-50"/>
            <h3 className="text-[rgba(255,255,255,0.7)] text-[24px] mb-3">Get the App From</h3>
            <ul className="flex gap-3">
                <li>
                    <a href="#">
                        <img src="/playstore.png" alt="fb" className="w-45" />
                    </a>
                </li>
                    <li>
                    <a href="#">
                            <img src="/appstore.png" alt="fb" className="w-45" />
                    </a>
                </li>            
            </ul>
            <div className="flex gap-3 mt-5">
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
    )
}