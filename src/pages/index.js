import React,{useEffect,useState} from 'react'
import web3Modal from 'web3modal';
import { ethers } from 'ethers';
import creator from './assets/boy_avatar.png';
import imageEth from './assets/eth.png';
import Image from 'next/image';
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
const showEthBalance= `${ethers.utils.formatEther(balance)} ETH\n`
// console.log(showEthBalance)
setBalance(showEthBalance);
  };

  const connectWallet=async()=>{
    if (!window.ethereum) return console.log(failMessage)
    const accounts=await window.ethereum.request({method: "eth_requestAccounts"});
    setCurrentAccount(accounts[0]);
    window.location.reload();
  }

  useEffect(() => {
    checkWalletConnected()
  
  })
  
  useEffect(()=>{
    async function accountChanged(){
      window.ethereum.on('accountsChanged', async function(){
        const accounts=await window.ethereum.request({method:'eth_accounts'});

        if (accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          window.location.reload();
        }
      } )
    }
    accountChanged()
  },[])
 
  return (
   <div className="card_container">
    {!currentAccount? '' :<span className="pro">PRO</span>}
    <Image src={creator}alt='profile' width={80} height={80}/>
    <h3>Check Ether</h3>

    {!currentAccount ? (<div> <div className='message'> <p>{failMessage}</p></div>
          <Image src={imageEth} alt='logo' height={100} width={100}/>
      <p>Welcome to ether account balance checker!</p></div>) :
      (<div><h5>Verified <span className='tick'>&#10004</span></h5>
      <p>Ether account and balance checker <br/> Find Account details</p>
      <div className='buttons'>
    <button className='primary ghost' onClick={()=>{}}>Ether Account Details</button>
        </div>
      </div>)}
      {!currentAccount && !connect ?(
        <div className='buttons'> 
        <button className='primary' onClick={()=>connectWallet()}>Connect Wallet</button>
        </div>
      ):(
        <div className='skills'>
          <h3>Your Ether</h3>
          <ul>
          <li>Account</li>
          <li>{currentAccount}</li>
          <li>Balance</li>
          <li>{balance}</li>

          </ul>

          </div>
      )}
   </div>
  )
}

export default Home