
import './App.css';
import CreateCampaign from './pages/CreateCampaign'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CampaignDetails from './pages/CampaignDetails'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Campaigns from './pages/Campaigns'

import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
function App() {
   
  
  return (
    <div className="App flex flex-col min-h-screen bg-gray-100">
    <Router> {/* Wrap your Routes with the Router component */}
    <ScrollToTop/>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaigns" element={<Campaigns />} />

          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </Router>
    <Footer />
  </div>
  );
}

export default App;
