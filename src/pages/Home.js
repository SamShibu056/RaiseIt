import SimpleImageSlider from "react-simple-image-slider";
import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/images/img1.jpeg";
import img2 from "../assets/images/img2.jpeg";
import img3 from "../assets/images/img3.jpeg";
import TestimonialCard from "../components/TestimonialCard";
const images = [{ url: img2 }, { url: img3 }, { url: img1 }];

const Home = () => {
  const navigate = useNavigate();
  const handleCreateCampaignClick = () => {
    navigate("/create-campaign");
  };
  return (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="flex items-center justify-center pt-36 w-full">
        <SimpleImageSlider
        className=""
          width={'67vw'}
          height={'67vh'}
          images={images}
          showBullets={true}
          showNavs={true}
          slideDuration={1.0}
          autoPlay={true}
        />
      </div>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our users are saying about their crowdfunding
              experiences.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              testimonial="Amazing platform! Thanks to RaiseIt, I was able to raise funds for my project and bring my idea to life."
              author="Dixon Jently"
            />
            <TestimonialCard
              testimonial="RaiseIt has transformed the way we reach out to supporters. The tools and support are outstanding."
              author="Emma Wilson"
            />
            <TestimonialCard
              testimonial="I couldn't believe how simple it was to get started and meet our funding goal within weeks!"
              author="Liam Smith"
            />

            {/* Additional testimonial cards go here */}
          </div>
        </div>
      </div>
      

      <div className="text-center my-8">
        <h2 className=" mx-5 text-xl md:text-3xl font-extrabold text-gray-900 ">
          Start Your Own Campaign Today!
        </h2>
        <p className=" mx-5 px-4 text-sm md:text-lg text-gray-600 mb-6 mt-5">
          Launch your project on RaiseIt and reach your funding goals with the
          power of blockchain.
        </p>
        <button
          className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg"
          onClick={handleCreateCampaignClick}
        >
          Start Your Own Campaign
        </button> 
      </div>

      <div className="md:py-7">
        {/* About Us Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 text-xl md:text-3xl">
              About Us
            </h2>
            <p className="mt-4 text-sm md:text-lg text-gray-600 mx-5">
              "RaiseIt is a pioneering blockchain-based crowdfunding platform
              that empowers individuals and organizations to launch, manage, and
              fund projects securely and transparently. Utilizing Ethereum
              technology, RaiseIt facilitates direct connections between project
              creators and supporters worldwide, democratizing access to funding
              and fostering a community driven by innovation and collaboration."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
