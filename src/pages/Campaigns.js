import React , { useContext, useState }from 'react'
import { ethers } from "ethers";
import crowdfunding_abi from "../contracts/crowdfunding_abi.json";
import Navbar from '../components/Navbar.js'
import { useEffect } from "react";
import { AppContext } from "../context/AppContext.js"
import ViewCampaigns from '../components/ViewCampaigns.js';

const Campaigns = () => {
    const [campaigns,setCampaigns] = useState([]);
    const [loading,setLoading] = useState(true);
    const { walletAddress,contractAddress } = useContext(AppContext);
    
    // const  = "0x2ae08696f05199ACEAE0cb7c01036f3C409a9bc5";
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
        parseCampaigns(result);
        setLoading(false);

      } catch (error) {
        console.error("Error creating campaign:", error);
        setLoading(false);
      }
    }
    useEffect(() => {
      getAllCampaigns();
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
      // console.log(campaigns);
      setCampaigns(campaigns);
    }
  return (
    <div className='pt-28 '>
       
        <Navbar/>
        <div className=' mx-auto '>
        <ViewCampaigns   campaigns = {campaigns} title = "All Campaigns" loading = {loading}/>
        </div>
        
    </div>
    
  )
}

export default Campaigns