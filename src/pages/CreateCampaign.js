import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import crowdfunding_abi from "../contracts/crowdfunding_abi.json";
import Navbar from "../components/Navbar.js";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { toast } from 'react-toastify';
import '../components/styles.css'
import Loader from "../components/Loader.js";
import Swal from 'sweetalert2'
const CreateCampaign = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const initialFormState = {
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  };
  const { walletAddress, addWalletListener, getCurrentWalletConnected ,contractAddress} =useContext(AppContext);
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    // eslint-disable-next-line
  }, [walletAddress]);

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleChange = (event) => {
    setForm((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  };
  const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const epochTime = new Date(form.deadline).getTime() / 1000;
    const targetWei = ethers.utils.parseEther(form.target); // Convert 0.1 ETH to Wei

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected.");
      }
      const exists = await new Promise((resolve, reject) => {
        checkIfImage(form.image, (exists) => {
          resolve(exists);
        });
      });
      console.log("hello");
      console.log(exists);
      if(exists){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const  = "0x2ae08696f05199ACEAE0cb7c01036f3C409a9bc5";
      const contract = new ethers.Contract(
        contractAddress,
        crowdfunding_abi,
        signer
      );

      const owner = walletAddress;
      const title = form.title;
      const description = form.description;
      const target = targetWei;
      const deadline = epochTime;
      console.log(deadline);
      const image = form.image;
      const tx = await contract.createCampaign(
        owner,
        title,
        description,
        target,
        deadline,
        image
      );
      await tx.wait();
      console.log("Campaign created. ");
      await Swal.fire({
        title: "Campaign created",
        text: `Transaction hash:${tx.hash}`,
        icon: "success"
      });
      setLoading(false);
      navigate('/campaigns');
      setForm(initialFormState);
      }
      else{
        setLoading(false);
        toast.error('Provide valid image URL', {
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
    } catch (error) {
      setLoading(false);
      toast.error('Transaction Error. Please Try Again.', {
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

  return (
    
    <div className="  bg-gray-100 h-full">
      {loading && <Loader text= "Transaction in Progress..."/>}
    <Navbar />
    <div className="flex flex-col pt-32 items-center justify-center">
    <div className="text-center mx-auto">
  <div className="bg-gradient-to-r from-sky-800 to-pink-500 bg-clip-text  text-transparent md:text-5xl font-bold text-4xl">Start Your</div>
  <div className="bg-gradient-to-r from-sky-800 to-pink-500 bg-clip-text  text-transparent md:text-6xl font-bold p-2 text-5xl">Campaign</div>
  <div className="text-gray-800 mt-4 md:mt-8 italic font-light md:text-xl max-w-md md:mx-auto mx-5 text-sm" >
    "Beyond boundaries, beyond limits. Your crowdfunding campaign is the catalyst for boundless possibilities. Start shaping tomorrow, today."
  </div>
  
</div>

      
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col  rounded-2xl p-4 shadow-2xl	bg-gray-400 text-gray-800   mt-7 box lg:w-3/5 mx-4 text-sm md:text-lg"
          >
            <div className="text-gray-200 text-2xl md:text-4xl font-bold  bg-slate-700 w-full h-20 flex justify-center items-center rounded-xl">
    Enter Campaign Details 
  </div>
            <div className="flex  w-full gap-3">
            <label className=" flex flex-col text-left mt-4 w-full ">
               <span className="ml-1">Campaign Title </span>  
              <input 
                name="title"
                type="text"
                value={form.title}
                className=" border-2  px-5 py-3  w-full rounded-xl border-gray-300 placeholder-gray-500 bg-gray-300 "
                placeholder="Write Your Title"
                onChange={handleChange}
                required
              />
              
            </label>
            </div>
            
      

            <label className=" flex flex-col text-left mt-4 w-full">
            <span className="ml-1">Description </span>  

              <textarea
                name="description"
                id="description"
                // name="description"
                rows="4"
                cols="50"
                placeholder="Enter your text here..."
                className=" border-2  w-full px-5 py-3 rounded-xl  border-gray-300 placeholder-gray-500 bg-gray-300"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </label>
            <div className="flex w-full gap-3 ">
            <label className="flex flex-col text-left mt-4 w-full">
            <span className="ml-1">Target </span>  
              
              <input
                name="target"
                type="Number"
                className="border-2  w-full px-5 py-3 rounded-xl mr-8 b	border-gray-300 placeholder-gray-500 bg-gray-300"
                placeholder="0.00 ETH"
                value={form.target}
                onChange={handleChange}
                required
              />
            </label>

            <label className="flex flex-col text-left mt-4 w-full">
              <span className="ml-1">Deadline </span>  
              <input
                name="deadline"
                type="Date"
                className="border-2 w-full px-5 py-3 rounded-xl  border-gray-300 placeholder-gray-500 bg-gray-300	"
                value={form.deadline}
                onChange={handleChange}
                required
              />
            </label>

            </div>
            
            <label className=" flex flex-col text-left mt-4 w-full">
             <span className="ml-1"> Image </span>   
              <input
                name="image"
                type="text"
                className=" border-2  w-full px-5 py-3 rounded-xl  border-gray-300 placeholder-gray-500 bg-gray-300"
                placeholder="Enter image URL"
                value={form.image}
                onChange={handleChange}
                required
              />
            </label>
            <button className="p-2 rounded-xl text-white mt-9 mb-3 w-80  bg-gray-800 font-bold hover:bg-[#26356a] transition-all duration-300">Submit</button>
          </form>
      </div>
    </div>
  );
  
  
};

export default CreateCampaign;
