import React , { useContext, useState }from 'react'
import { ethers } from "ethers";
import crowdfunding_abi from "../contracts/crowdfunding_abi.json";
import Navbar from '../components/Navbar.js'
import { useEffect } from "react";
import { AppContext } from "../context/AppContext.js"
import ViewCampaigns from '../components/ViewCampaigns.js';
import { toast } from 'react-toastify';
const Profile = () => {
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [loading,setLoading] = useState(true);
    const { walletAddress ,contractAddress} = useContext(AppContext);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, crowdfunding_abi, provider);
    async function getAllCampaigns(){
      setLoading(true);
      try {
        if (!window.ethereum) {
          throw new Error("MetaMask not detected.");
        }
        const result = await contract.getCampaingns();
        console.log(result);
        const ans = parseCampaigns(result);
        
        setLoading(false);
        return ans;
      } catch (error) {
        
        console.error("Error creating campaign:", error);
        setLoading(false);
      }
    }
    useEffect(() => {
      getUserCampaigns();
      // eslint-disable-next-line
    }, [walletAddress]); 
    function parseCampaigns(result){
      const campaigns = result.map((campaign,id)=>({
        owner: campaign.owner,
        title: campaign.title,
        description : campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected : ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        cid : id
      }))
      // setCampaigns(campaigns);
      return campaigns;
    }

    async function getUserCampaigns(){
      try{
        const temp = await getAllCampaigns();
      const filteredCampaigns = temp.filter((campaign) => campaign.owner.toLowerCase() === walletAddress.toLowerCase());
      setFilteredCampaigns(filteredCampaigns);
      return filteredCampaigns;
      }
      catch(error){
        setLoading(false);
        setFilteredCampaigns([]);
        toast.error('Error Loading Campaigns', {
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
    }

  return (
    <div className='flex flex-col items-center justify-start bg-gray-100 pt-10 px-4 lg:px-0 mt-24'>
  <Navbar/>
  <p className="text-gray-800 text-4xl font-bold mb-2 text-center ">
    Welcome,
    {walletAddress && <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-3xl ml-2">
      {walletAddress.substring(0,10)}...{walletAddress.substring(38)}
    </span>}
    
  </p>
  <hr className='w-full max-w-md my-4 border-t-2 border-gray-300'/>
  
  <div className='w-full mx-auto mt-6'>
    <ViewCampaigns campaigns={filteredCampaigns} title="Your Campaigns" loading={loading} />
  </div>
</div>
  )
}

export default Profile