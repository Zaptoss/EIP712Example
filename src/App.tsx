import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);
  const [signature, setSignature] = useState<string>("");

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };
    getProvider();
  }, []);

  const updateWallet = async (accounts: any) => { 
    setWallet({ accounts });                      
  };                                              
  const handleConnect = async () => {             
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",              
    });                                           
    updateWallet(accounts);                       
  };                                              

  const myFetch = async () => {
    const response = await fetch("https://...",
      { method: "" });
      const resBody = await response.json();

      const domain: ethers.TypedDataDomain = JSON.parse(JSON.stringify(resBody.data.attributes.domain));
      const types: Record<string, Array<ethers.TypedDataField>> = JSON.parse(JSON.stringify(resBody.data.attributes.types))
      const value: Record<string, any> = JSON.parse(JSON.stringify(resBody.data.attributes.message));
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      const signature = await signer.signTypedData(domain, types, value);
      setSignature(signature);
      console.log(signature);
  };

  return (
    <div className="App">
      {hasProvider && (                              
        <button onClick={handleConnect}>Connect MetaMask</button>
      )}

      {wallet.accounts.length > 0 && (
        <button onClick={myFetch}>Fetch</button>
      )}

      {wallet.accounts.length > 0 && (
        <div>Wallet Accounts: {wallet.accounts[0]}</div>
      )}

      {signature != "" && (
        <div>Signature: {signature}</div>
      )}
    </div>
  );
};

export default App;