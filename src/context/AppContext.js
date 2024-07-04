import { createContext } from "react";
import { useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({children}){
	const contractAddress = "0x29038780A17674eDF2dB0111C72A7827bDC825c9";
	//0x09637A30fcE15385419334ca6fD939F822394C52 holesky deployed
    const [walletAddress, setWalletAddress] = useState("");
    const addWalletListener = async () => {
		if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
		  window.ethereum.on("accountsChanged", (accounts) => {
			setWalletAddress(accounts[0]);
			// console.log(accounts[0]);
		  });
		} else {
		  /* MetaMask is not installed */
		  setWalletAddress("");
		  console.log("Please install MetaMask");
		}
	  };
      const getCurrentWalletConnected = async () => {
		if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
		  try {
			const accounts = await window.ethereum.request({
			  method: "eth_accounts",
			});
			if (accounts.length > 0) {
			  setWalletAddress(accounts[0]);
			//   console.log(accounts[0]);
			} else {
			  console.log("Connect to MetaMask using the Connect button");
			}
		  } catch (err) {
			console.error(err.message);
		  }
		} else {
		  /* MetaMask is not installed */
		  console.log("Please install MetaMask");
		}
	  };
	  
      const connectwallet = async()=>{
		if(typeof window !="undefined" && typeof window.ethereum != "undefined"){
		  try{
			// metamask is installed
			const accounts = await window.ethereum.request({
			  method: "eth_requestAccounts",
			});
			setWalletAddress(accounts[0]);
			// console.log(accounts[0]);
		  }
		  catch (err) {
			console.error(err.message);
		  }
		}
		else {
		  /* MetaMask is not installed */
		  console.log("Please install MetaMask");
		}
	  }
      const value = {
        walletAddress,
        setWalletAddress,
        addWalletListener,
        getCurrentWalletConnected,
        connectwallet,
		contractAddress,
      }
      return <AppContext.Provider value = {value}>
        {children}
      </AppContext.Provider>

}