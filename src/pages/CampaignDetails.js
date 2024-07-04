import React, { useState, useContext, useEffect } from "react";

import { ethers } from "ethers";
import Navbar from "../components/Navbar.js";
import { AppContext } from "../context/AppContext.js";
import { useLocation } from "react-router-dom";
import crowdfunding_abi from "../contracts/crowdfunding_abi.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../components/Loader.js";
const CampaignDetails = () => {
  const { walletAddress ,contractAddress} = useContext(AppContext);
  const [donators, setDonators] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() * 1000 - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };
  const deadline_days = daysLeft(state.deadline);
  function calculateBarPercentage(goal, raisedAmount) {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
  }

  const progress = calculateBarPercentage(state.target, state.amountCollected);
  // console.log(progress)

  const donateToCampaign = async (campaignId, donationAmount) => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected.");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        crowdfunding_abi,
        signer
      );

      const amount = ethers.utils.parseEther(donationAmount);
      const tx = await contract.donateToCampaign(campaignId, {
        value: amount,
      });
      await tx.wait();
      // console.log("Donation successful. Transaction hash:", tx.hash);
      setLoading(false);
      await Swal.fire({
        title: "Donation Received",
        text: "Thank you for your support. Your contribution has been successfully processed.",
        icon: "success",
      });

      navigate("/campaigns");
    } catch (error) {
      setLoading(false);
      toast.error("Transaction Error. Please Try Again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const getDonaters = async (campaignId) => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask not detected.");
      }

      // Connect to the Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Replace with your contract address
      const contract = new ethers.Contract(
        contractAddress,
        crowdfunding_abi,
        provider
      );
      const donations = await contract.getDonators(campaignId);

      const donators = donations[0];
      const donationAmounts = donations[1];

      const parsedDonations = [];

      for (let i = 0; i < donators.length; i++) {
        parsedDonations.push({
          donator: donators[i],
          donation: ethers.utils.formatEther(donationAmounts[i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error("Error retrieving donations:", error);

      return [];
    }
  };

  const fetchDonators = async () => {
    const data = await getDonaters(state.cid);
    setDonators(data);
  };
  useEffect(() => {
    fetchDonators();
    // eslint-disable-next-line
  }, [walletAddress]);

  return (
    <div className="text-white">
      {loading && <Loader text="Transaction in Progress..." />}
      <Navbar className = "text-black"/>
      <div className="mt-24"></div>
      <div className="container mx-auto py-8">
        <div className="bg-opacity-25 bg-white bg-blur rounded-lg shadow-lg overflow-hidden">
          {/* Campaign Content */}
          <div className="flex">
            {/* Campaign Image */}
            <div className="w-full p-6">
              <div className="relative mb-2" style={{ height: 450 }}>
                <img
                  src={state.image}
                  alt="Campaign"
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-50 text-white px-4 py-2 rounded-br-lg">
                  New
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-gray-200 h-4 rounded-full w-full">
                    <div
                      className="bg-gray-800 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="w-1/5 p-6 mt-8">
              {/* Days Left */}
              <div className="bg-gray-200 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Days Left
                </h2>
                <p className="text-gray-800">{deadline_days}</p>
              </div>
              {/* Required Amount */}
              <div className="bg-gray-200 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Raised</h2>
                <p className="text-gray-800">{state.amountCollected} ETH</p>
              </div>
              {/* Target */}
              <div className="bg-gray-200 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Target</h2>
                <p className="text-gray-800">{state.target} ETH</p>
              </div>
              {/* Number of Donators */}
              <div className="bg-gray-200 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Backers
                </h2>
                <p className="text-gray-800">{donators.length}</p>
              </div>
            </div>
          </div>

          {/* Fund the Campaign */}
          
          {/* Campaign Description */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Campaign Description
            </h2>
            <p className="text-gray-800">{state.description}</p>
          </div>
          <div className=" w-3/5 md:w-2/5 mx-auto bg-gray-400 text-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Fund the Campaign</h2>
              <div>
                <div className="mb-6 relative">
                  <label className="block mb-5">Amount to be Donated</label>
                  <input
                    name="amount"
                    type="number"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none placeholder-gray-500 bg-gray-300"
                    placeholder="0.00 ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => donateToCampaign(state.cid, amount)}
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>

          {/* Donators */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Donators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
              {/* Donator Cards */}
              {donators.length > 0 ? (
                donators.map((item, idx) => (
                  <div key={idx} className="bg-gray-200 rounded-lg p-4">
                    <p className="text-gray-800">
                      Address: {item.donator.substring(0, 6)}...
                      {item.donator.substring(38)}
                    </p>
                    <p className="text-gray-800">Amount: {item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-800 col-span-full text-center">
                  No Donators Yet. Be the First
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
