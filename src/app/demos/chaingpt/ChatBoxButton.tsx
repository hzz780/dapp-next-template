import React, {useEffect, useState} from 'react';
import {ChainGPTLogo} from '@/app/demos/chaingpt/components/ChainGPTLogo';
import {TipBox} from '@/app/demos/chaingpt/components/TipBox';
import {CustomChatBox} from '@/app/demos/chaingpt/CustomChatBox';

export function ChatBoxButton() {
  const [hiddenTip, setHiddenTip] = useState(true);
  const [hiddenChat, setHiddenChat] = useState(true);
  const [readyToShow, setReadyToShow] = useState(false);
  useEffect(() => {
    const chainGPTTalked = localStorage.getItem('chainGPT');
    if (!chainGPTTalked) {
      setHiddenTip(false);
      localStorage.setItem('chainGPT', 'chainGPT talked');
    }
    setReadyToShow(true);
  }, []);

  return <>
    { hiddenTip ? '' : readyToShow && <TipBox />}
    <div
      className={hiddenChat ? "block" : "hidden"}
      onClick={() => {
        setHiddenTip(true);
        setHiddenChat(false);
      }}><ChainGPTLogo/></div>
    <div className={!hiddenChat ? "block" : "hidden"}>
      <CustomChatBox
        onClose={() => {
          setHiddenChat(true);
        }}
      />
    </div>
  </>
}
