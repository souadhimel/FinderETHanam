import React,{useEffect,useState} from 'react'
import web3Modal from 'web3modal';
import { ethers } from 'ethers';
import creator from './assets/boy_avatar.png';
import imageEth from './assets/ethereum.jpeg';
const Home = () => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState('');
 

  const failMessage="Please install metamask and get connected!!!";
  const successMessage="Congratz!! Your account successfully connected!";
 
  const INFURA_ID="ce377f7431c54bb49f130e304cc13b3e";
  const provider=new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

  const checkWalletConnected=async()=>{
    if(!window.ethereum) {
      console.log("Make sure you have Metamask installed");
      return;
    } else {
      console.log("Wallet exist");
    }

    const accounts=await window.ethereum.request({method: "eth_requestAccounts"});
  // console.log(accounts)
  
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      // return failMessage;
      console.log("failed message!")
    }
const address="0x1268AD189526AC0b386faF06eFfC46779c340eE6";
const balance=await provider.getBalance(address);
const showEthBalance= `${ethers.utils.formatEther(balance)}`
console.log(showEthBalance)
  };
  checkWalletConnected()
  return (
    <div>Home</div>
  )
}

export default Home