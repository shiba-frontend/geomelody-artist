"use client";
import { motion } from "framer-motion";


export default function Home() {

  return (
    <>
    
        <div className="w-full pl-4 pr-0 md:pl-8 mx-auto py-10 relative">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="lg:w-1/3 lg:mt-20 mt-0 w-full">
              <h2 className="lg:text-[100px] md:text-[40px] text-[30px] font-bold leading-none lg:mb-0 mb-4">
                Your Sound Your Story
              </h2>
              <p className="lg:text-[34px] md:text-[24px] text-[20px] font-medium leading-tight">
                Turn your music into a movement—connect, grow, and build a world
                of your own.
              </p>
              <motion.button
                whileHover={{ scale: 1.2 }}
                className="theme-bttn mt-5"
              >
                <a href="/signup">
                Join Now
                </a>
              </motion.button>
            </div>
            <div className="lg:w-2/3 w-full relative text-right flex justify-end">
              <img src="/lady.png" alt="lady" className="w-[90%]" />
              <h1 className="bg-text">ARTIST</h1>
              <img src="/color-one.png" alt="color" className="color-shade" />
            </div>
          </div>
          <img src="/bg-shape-one.png" alt="shape" className="bg-shap-one" />
        </div>
        <div className="relative">
          <div className="w-full px-8  md:px-8 mx-auto py-10 relative">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2 w-full">
                <img src="/prototype.png" alt="prototype" />
              </div>
              <div className="md:w-1/2 w-full">
                <h4 className="text-[16px] font-medium text-[#FFCD27] mb-3">
                  FEATURES
                </h4>
                <h2 className="lg:text-[48px] text-[28px] font-medium text-[#fff] mb-5 leading-tight">
                  Everything You Need to <br></br> Elevate Your Music
                </h2>
                <p className="text-[18px] mb-6">
                  Powerful tools designed to help artists grow their audience,
                  strengthen their brand, and turn every release into an
                  opportunity. From music and video promotion to pre-release
                  campaigns, merchandise, and ticket sales — build your career
                  and connect with fans, all in one place.
                </p>
                <ul className="grid-ul">
                  <li>Real-time streaming analytics</li>
                  <li>AI-powered audience insights</li>
                  <li>Release performance predictions</li>
                  <li>AI promotional recommendations</li>
                  <li>Fan engagement tools</li>
                  <li>Smart playlist recommendations</li>
                  <li>Release calendar</li>
                  <li>Compare two releases/tracks</li>
                  <li>Export analytics reports</li>
                  <li>Multi-artist/team access</li>
                  <li>Manager & label permissions</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full px-4  md:px-8 mx-auto py-10 relative">
            <ul className="bg-text-one">
              <li>Create</li>
              <li>Connect</li>
              <li>Grow</li>
            </ul>
          </div>
          <img src="/color-two.png" alt="color" className="color-shade-one" />
          <div className="w-full px-4  md:px-8 mx-auto py-10 relative">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="lg:w-1/3 w-full">
                <h4 className="text-[16px] font-medium text-[#FFCD27] mb-3">
                  Fan & Follower Insights
                </h4>
                <h2 className="lg:text-[48px] text-[28px] font-medium text-[#fff] mb-5 leading-tight">
                  See Where Your Music <br></br> Connects
                </h2>
                <p className="text-[18px] mb-6">
                  Get a clearer picture of your fanbase with powerful insights
                  into listener growth, locations, engagement, and listening
                  behavior.
                </p>
                <ul className="grid-ul">
                  <li>Follower growth</li>
                  <li>Most engaged fans</li>
                  <li>Fan locations</li>
                  <li>Audience interests</li>
                  <li>Engagement trends</li>
                </ul>
                  <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="theme-bttn mt-5"
                >
                   <a href="/signup">
                Join Now
                </a>
                </motion.button>
              </div>
              <div className="lg:w-2/3 w-full flex justify-end">
                <img src="/lady-one.png" alt="prototype" />
              </div>
            </div>
            <img src="/bg-shape-one.png" alt="shape" className="bg-shap-one" />
          </div>
        </div>
        <div className="w-full px-8  md:px-8 mx-auto py-10 relative">
          <div className="flex flex-col-reverse md:flex-row gap-10">
            <div className="lg:w-1/2 w-full">
              <img src="/boy.png" alt="prototype" />
            </div>
            <div className="lg:w-1/2 w-full lg:mt-20 mt-0">
              <h4 className="text-[16px] font-medium text-[#FFCD27] mb-3">
                AI-Powered Audience Insights
              </h4>
              <h2 className="lg:text-[48px] text-[28px] font-medium text-[#fff] mb-5 leading-tight">
                Smarter Insights <br></br> Stronger Connections
              </h2>
              <p className="text-[18px] mb-6">
                Understand who listens to your music, where your fans are, and
                how they engage with your releases.
              </p>
              <ul className="grid-ul">
                <li>Real-time streaming analytics</li>
                <li>AI-powered audience insights</li>
                <li>Release performance predictions</li>
                <li>AI promotional recommendations</li>
                <li>Fan engagement tools</li>
                <li>Smart playlist recommendations</li>
                <li>Release calendar</li>
                <li>Compare two releases/tracks</li>
                <li>Export analytics reports</li>
                <li>Multi-artist/team access</li>
                <li>Manager & label permissions</li>
              </ul>
            </div>
          </div>
           <img
              src="/color-three.png"
              alt="shape"
              className="color-three absolute"
            />
        </div>
          <div className="relative">
            <img
              src="/bg-shape-one.png"
              alt="shape"
              className="bg-shap-two absolute left-0 right-0"
            />
            <div className="w-full px-4 md:px-8 mx-auto py-10 relative">
              <div className="flex lg:flex-row flex-col justify-between items-center">
                <div>
                  <h3 className="lg:text-[48px] text-[28px] font-medium text-[#fff] mb-3 leading-tight">Ready to create your artist profile?</h3>
                  <p className="text-[18px]">
                    Understand who listens to your music, where your fans are,
                    and how they engage with your releases.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="theme-bttn mt-5"
                >
                  <a href="/signup">
                Join Now
                </a>
                </motion.button>
              </div>
            </div>
          </div>
   
    </>
  );
}
