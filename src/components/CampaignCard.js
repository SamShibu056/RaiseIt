import React from "react";
import { FiClock, FiDollarSign, FiUsers } from "react-icons/fi";

const CampaignCard = ({owner,title,description,target,deadline,amountCollected, image, handleClick}) => {
    const daysLeft = (deadline) => {
        const difference = new Date(deadline).getTime()*1000 - Date.now();
        const remainingDays = difference / (1000 * 3600 * 24);
        return remainingDays.toFixed(0);
      };
    const deadline_days = daysLeft(deadline); 

    function calculateBarPercentage  (goal, raisedAmount) {
      const percentage = Math.round((raisedAmount * 100) / goal);
    
      return percentage;
    };
    const progress = calculateBarPercentage(target,amountCollected);
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg rounded-lg overflow-hidden  max-w-[22rem] md:max-w-sm cursor-pointer relative transition duration-300 hover:bg-opacity-80 hover:transform hover:scale-105" onClick={handleClick}>
  {/* overlay div for the darker shade */}
  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>

      <img
        src={image}
        alt="Campaign"
        className="w-full h-48 object-cover"
      />
      <div className="p-6  ">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
      {title.length > 30 ? `${title.substring(0, 30)}...` : title}
    </h3>
        <p className="text-sm text-gray-600 mb-4 ">
        {`${description.substring(0, 82)}...`}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-700 mb-2">
          <div className="flex items-center space-x-2">
            <FiDollarSign />
            <span>Target: {target} ETH</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiDollarSign />
            <span>Raised: {amountCollected} ETH</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-700">
          <div className="flex items-center space-x-2">
            <FiClock />
            <span>Days Left: {deadline_days}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiUsers />
            <span>Owner: {`${owner.substring(0,6)}...${owner.substring(38)}`}</span>
          </div>
        </div>
        <div className="bg-gray-200 h-3 rounded-lg mt-3 overflow-hidden">
        <div className="bg-purple-400 h-full rounded-lg" style={{ width: `${progress}%` }}></div>

        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
