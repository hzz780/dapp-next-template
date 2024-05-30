'use client'
import AElfBridge from 'aelf-bridge';
import {useState} from 'react';
// `app/hello/page.tsx` is the UI for the `/hello` URL
export default function Page() {
  const [bridgeInstance, setBridgeInstance] = useState<any>(null);
  return <>
    <h1>Hello Page!</h1>
    <div onClick={() => {
      throw Error('click to throw error');
    }}>Click</div>
    <div
      onClick={() => {
        const bridgeInstance = new AElfBridge({
          timeout: 3000,
          // endpoint: 'https://tdvv-public-node.aelf.io',
        });
        bridgeInstance.connect().then((isConnected: boolean) => {
          console.log('isConnected', isConnected);
          alert('isConnected: ' + isConnected);
          setBridgeInstance(bridgeInstance);
        });
      }}
    >Click to Login</div>
    <div
      onClick={() => {
        if (!bridgeInstance) {
          alert('Please login first');
          return;
        }
        const tokenAddress = 'ELF_7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX_tDVV'; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
        bridgeInstance.chain.contractAt(tokenAddress).then(async (contract: any) => {
          const tokenInfo = await contract.GetTokenInfo.call({symbol: 'ELF'});
          const transactionId = await contract.Transfer({
            amount: "10000000000",
            spender: "FveRXL9PgVhMkoDcPh9jCkjF8WxW2K2aA72xAx4ngPqYnpNVw",
            symbol: "ELF",
          });
          console.log(transactionId);
          alert('transactionId: ' + transactionId);
        })
      }}
    >
      Click to Approve
    </div>
  </>
}
