'use client'
import { WebLoginProvider, init, useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { walletConnectConfig } from '@/app/lib/walletConnectConfig';
import { Button } from 'aelf-design';
import { TWalletInfo } from '@aelf-web-login/wallet-adapter-base';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/app/lib/reduxToolkit/hooks';
import {
  deleteWalletInfo,
  getWalletInfo,
  setWalletInfo
} from '@/app/lib/reduxToolkit/features/walletConnect/walletConnectSlice';

export default function Page() {
  const bridgeAPI = init(walletConnectConfig); // upper config
  return (
    <WebLoginProvider bridgeAPI={bridgeAPI}>
      <div><WalletConnect /></div>
      <div><WalletConnectWithRTK /></div>
    </WebLoginProvider>
  );
}

const WalletConnect = () => {
  const [ walletConnected, setWalletConnected] = useState<TWalletInfo | null>();

  const { connectWallet, disConnectWallet } = useConnectWallet();
  const onConnectBtnClickHandler = async() => {
    try {
      const rs = await connectWallet();
      setWalletConnected(rs);
      console.log('rs: ', rs);
    } catch (e: any) {
      console.log(e.message)
    }
  }
  const onDisConnectBtnClickHandler = async () => {
    await disConnectWallet();
    setWalletConnected(null);
  }

  return <>
    <Button onClick={onConnectBtnClickHandler}>connect</Button>
    <Button onClick={onDisConnectBtnClickHandler}>disconnect</Button>
    <div>Account name: {walletConnected?.name}</div>
    <div>Account name: {walletConnected?.address}</div>
  </>
}

const WalletConnectWithRTK = () => {
  const dispatch = useAppDispatch();
  const walletConnected = useAppSelector(getWalletInfo);
  const { connectWallet, disConnectWallet } = useConnectWallet();
  const onConnectBtnClickHandler = async() => {
    try {
      const rs = await connectWallet();
      dispatch(setWalletInfo(rs))
      console.log('walletConnected rs: ', rs);
    } catch (e: any) {
      console.log(e.message)
    }
  }
  const onDisConnectBtnClickHandler = async () => {
    await disConnectWallet();
    dispatch(deleteWalletInfo());
  }
  console.log('walletConnected: ', walletConnected);
  return <>
    <div className="mt-12">
      We can see the changes of the account name and address in the left sidebar.
    </div>
    <Button onClick={onConnectBtnClickHandler}>connect</Button>
    <Button onClick={onDisConnectBtnClickHandler}>disconnect</Button>
    <div>Account name: {walletConnected?.name}</div>
    <div>Account name: {walletConnected?.address}</div>
  </>
}
