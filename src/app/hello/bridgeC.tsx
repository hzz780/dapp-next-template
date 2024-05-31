'use client'
import AElfBridge from 'aelf-bridge';
import {useState} from 'react';
import VConsole from 'vconsole';
const vConsole = new VConsole();
// or init with options
export default function BridgePage() {
  const [bridgeInstance, setBridgeInstance] = useState<any>(null);
  return <>
    <div onClick={() => {
      throw Error('click to throw error');
    }}>Click</div>
    <div onClick={() => {
      console.log('AElfBridge: ', AElfBridge);
      const bridgeInstance = new AElfBridge({
        timeout: 3000,
        endpoint: 'https://tdvv-public-node.aelf.io',
      });
      bridgeInstance.connect().then((isConnected: boolean) => {
        console.log('isConnected', isConnected);
        setBridgeInstance(bridgeInstance);
      }).catch((err: any) => {
        console.log('err:', err);
      });
    }}
    >Click to Login</div>
    <div onClick={() => {
      if (!bridgeInstance) {
        console.log('Please login first');
        return;
      }
      bridgeInstance.account().then((res: any) => {
        console.log('account:', res);
      })
    }}>
      click to get account
    </div>
    <div
      onClick={() => {
        console.log('Hello world', 'no end point');
        if (!bridgeInstance) {
          console.log('Please login first');
          return;
        }
        const tokenAddress = 'ELF_7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX_tDVV'; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
        bridgeInstance.chain.contractAt(tokenAddress).then(async (contract: any) => {
          // const tokenInfo = await contract.GetTokenInfo.call({symbol: 'ELF'});
          // console.log('tokenInfo: ', tokenInfo);
          const transactionId = await contract.Approve({
            amount: "10000000000",
            spender: "FveRXL9PgVhMkoDcPh9jCkjF8WxW2K2aA72xAx4ngPqYnpNVw",
            symbol: "ELF",
          });
          console.log(transactionId);
          // alert('transactionId: ' + transactionId);
        })
      }}
    >
      Click to Approve， Token
    </div>
    <div
      onClick={() => {
        if (!bridgeInstance) {
          console.log('Please login first');
          return;
        }
        const proposalContract = '4SGo3CUj3PPh3hC5oXV83WodyUaPHuz4trLoSTGFnxe84nqNr'; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
        bridgeInstance.chain.contractAt(proposalContract).then(async (contract: any) => {
          console.log('proposalContract: ', proposalContract);
          const transactionId = await contract.Approve("9a0b558ac3e6d7e9c64c2bdc430045e317a2bb5c16dfa25dfc1de1586dfd998a");
          console.log(transactionId);
        })
      }}
    >
      Click to Approve, Proposal
    </div>
  </>
}
