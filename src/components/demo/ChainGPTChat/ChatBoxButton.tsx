import React, {useEffect, useState} from 'react';
import {ChainGPTLogo} from './components/ChainGPTLogo';
import {TipBox} from './components/TipBox';
import {CustomChatBox} from './CustomChatBox';

export function ChatBoxButton({apiUri}) {
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
        apiUri={apiUri}
      />
    </div>
  </>
}
