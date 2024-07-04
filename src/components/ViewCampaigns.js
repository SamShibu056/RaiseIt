import React from "react";

import { useNavigate } from "react-router-dom";
import "./styles.css";
import CampaignCard from "./CampaignCard.js";
const ViewCampaigns = ({ campaigns, title, loading }) => {
  console.log(campaigns);
  const navigate = useNavigate();
  function handleNavigate(campaign) {
    // Function to convert a title into a URL-friendly slug
    const titleToSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    };
    // Generate the slug for the campaign title
    const slug = titleToSlug(campaign.title);
    // Navigate using a template literal for the path
    navigate(`/campaign-details/${slug}`, { state: campaign });
  }
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() * 1000 - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };
  return (
    <div className="bg-gray-100 border-3 flex flex-wrap justify-center w-full">
      <div className="lg:w-5/6 w-full">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text mb-6 font-Montserrat mt-5">
          {title}
          <span className="text-sm font-semibold text-gray-600 ml-2">
            ({campaigns.length} campaigns)
          </span>
        </h1>

        {!loading && campaigns.length === 0 && (
          <div className="text-sky-950">
            {" "}
            No Campaigns Available At The Moment
          </div>
        )}
        <div className="flex gap-4 flex-wrap justify-center  mx-auto">
          {!loading &&
            campaigns.length > 0 &&
            campaigns
              .filter((campaign) => {
                const deadlineDays = daysLeft(campaign.deadline); // Assuming daysLeft returns the number of days left

                const amountCollected = parseFloat(campaign.amountCollected);
                const target = parseFloat(campaign.target);

                return deadlineDays > 0 && amountCollected < target;
              })
              .map((campaign) => (
                <CampaignCard
                  key={campaign.cid}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCampaigns;
