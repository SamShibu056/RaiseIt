import React, { useContext, useState } from "react";
import { FaConnectdevelop } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";
// import { ReactComponent as Logo } from "../logo.svg";
import { MdCampaign } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import Loader from "../components/Loader.js";
import { ReactComponent as Logo } from "../logo.svg";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [accloading, setaccloading] = useState(false);
  const {
    walletAddress,
    setWalletAddress,
    addWalletListener,
    getCurrentWalletConnected,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const connectwallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        setaccloading(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        // console.log(accounts[0]);
        setaccloading(false);
      } catch (err) {
        console.error(err.message);
        setaccloading(false);
      }
    }
  };
  const initializeWallet = async () => {
    try {
      setaccloading(true);
      await getCurrentWalletConnected();
      await addWalletListener();

      // setTimeout(() => {
      setaccloading(false);
      // }, 500);
    } catch (error) {
      console.error("Error initializing wallet:", error);
      setaccloading(false); // Set loading to false in case of an error
    }
  };
  useEffect(() => {
    initializeWallet();
    // eslint-disable-next-line
  }, [walletAddress]);

  const handleCreateCampaignClick = () => {
    navigate("/create-campaign");
  };
  const CampaignNavigate = () => {
    navigate("/campaigns");
  };
  const homenavigate = () => {
    navigate("/");
  };
  const profileNavigate = () => {
    navigate("/profile");
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  // console.log(accloading);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling on body when overlay is open
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling on body when overlay is closed
    }
  }, [isOpen]);
  return (
    <div className="fixed top-0 w-full z-50">
      {accloading && <Loader text="Loading..." />}
      {isOpen && (
        <div className="fixed inset-0 z-30 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col overflow-hidden"></div>
      )}
      <div className="  bg-white flex justify-between items-center py-2 px-6 relative shadow-md ">
        <div className=" cursor-pointer " onClick={homenavigate}>
          <div className="flex gap-5 items-center justify-center ">
            <Logo className="" />
            <div className="flex flex-col items-start">
              <div className="font-bold text-4xl font-[Open Sans] hidden md:block">
                <div className="relative group ">
                  <span className="bg-gradient-to-r from-purple-700 to-red-500 text-transparent bg-clip-text">
                    RaiseIt
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-purple-700 text-transparent bg-clip-text absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                    RaiseIt
                  </span>
                </div>
              </div>
              <div className="text-gray-600 font-sans text-sm italic mt-1 tracking-wide hidden md:block text-left ">
                Your Home For Help!
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center md:space-x-4 space-x-1">
          <button
            onClick={connectwallet}
            className="bg-pink-700 b-2 rounded-xl py-2 px-5 text-white relative hover:bg-pink-500 transition-all delay-100 "
          >
            <div className="flex items-center justify-center gap-2 hidden md:block">
              {walletAddress && walletAddress.length > 0
                ? `Connected: ${walletAddress.substring(
                    0,
                    6
                  )}...${walletAddress.substring(38)}`
                : "Connect Wallet"}
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              {walletAddress && walletAddress.length > 0 ? (
                <span>Connected</span>
              ) : (
                <span>Connect</span>
              )}
            </div>
          </button>
          <div className="relative group ">
            <button
              className="bg-sky-950 b-2 rounded-xl py-2 px-5 h-full text-white hover:bg-sky-800 transition-all delay-100 hidden md:block"
              onClick={CampaignNavigate}
            >
              <MdCampaign className="text-white-500 size-6" />
            </button>
            <div
              className="absolute top-full mt-2 hidden group-hover:block px-3 py-1 text-sm text-white bg-black rounded transition-opacity duration-300 delay-150 z-30"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              All Campaigns
            </div>
          </div>

          {walletAddress && walletAddress.length > 0 && (
            <div className="relative group hidden ">
              <button
                className="b-2 rounded-xl py-2 px-5 h-full text-white hover:bg-[#42c3b4] transition-all bg-[#1e8579]  hidden md:block "
                onClick={handleCreateCampaignClick}
              >
                <MdAddBox className="text-white-500 size-6" />
              </button>
              <div
                className="absolute top-full mt-2 hidden group-hover:block px-3 py-1 text-sm text-white bg-black rounded transition-opacity duration-300 delay-150 z-30"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                Create a Campaign
              </div>
            </div>
          )}
          {walletAddress && walletAddress.length > 0 && (
            <div className="relative group ">
              <button
                className="text-white bg-black hover:bg-gray-600 p-1 rounded-full transition-all duration-300 hidden md:block"
                onClick={profileNavigate}
              >
                <CgProfile className="size-8" />
              </button>
              <div
                className="absolute top-full mt-2 hidden group-hover:block px-3 py-1 text-sm text-white bg-black rounded transition-opacity duration-300 delay-150 z-30"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                Your Profile
              </div>
            </div>
          )}
          <div>
            {walletAddress && walletAddress.length > 0 && (
              <div
                className={`fixed top-0 right-0 h-full flex flex-col py-5 bg-pink-700 w-3/4 z-50
                        transform transition-transform transition-delay-300 ${
                          isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
              >
                <button className="flex justify-end">
                  <IoMdClose
                    className="block md:hidden text-4xl text-white mr-5 mb-6"
                    onClick={handleOpen}
                  />
                </button>
                <button
                  className="py-2 px-4 mb-2 text-left text-white flex justify-between items-center"
                  onClick={homenavigate}
                >
                  Home
                   <TiHomeOutline  className="text-white-500 size-9"/>

                </button>
                <button
                  className="py-2 px-4 mb-2 text-left text-white flex justify-between items-center"
                  onClick={handleCreateCampaignClick}
                >
                  Create Campaign
                  <MdAddBox className="text-white-500 size-9" />
                </button>
                <button
                  className="py-2 px-4 mb-2 text-left text-white flex justify-between items-center"
                  onClick={CampaignNavigate}
                >
                  View Campaigns
                  <MdCampaign className="text-white-500 size-8 " />
                </button>
                <button
                  className="py-2 px-4 mb-2 text-left text-white flex justify-between items-center"
                  onClick={profileNavigate}
                >
                  Your Profile
                  <CgProfile className="size-8" />
                </button>
              </div>
            )}
            <div>
              {walletAddress && walletAddress.length > 0 && !isOpen && (
                <button onClick={handleOpen} className="">
                  <RiMenu3Fill className="block md:hidden text-4xl text-black" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
