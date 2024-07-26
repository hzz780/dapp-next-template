"use client"
/**
 * <AntdRegistry>
 * If you are using the App Router in Next.js and using antd as your component library,
 * to make the antd component library work better in your Next.js application and provide a better user experience,
 * you can try using the following method to extract
 * and inject antd's first-screen styles into HTML to avoid page flicker.
 * https://ant.design/docs/react/use-with-next
 **/
import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import {ChatBoxButton, ChainGPT} from 'chaingpt-component'
import 'chaingpt-component/dist/index.css';
const {TipBox, ChainGPTLogo, CustomChatBox} = ChainGPT;
export default function Page() {
  const [chatAPI, setChatAPI] = useState<string>('');
  useEffect(() => {
    // setChatAPI(`${location.protocol}//${location.host}/chaingpt/api/chat`);
    setChatAPI('/api/demos/chaingpt');
  }, []);

  return <div className="p-3 flex">
    <div>
      <TipBox />
      <ChainGPTLogo />
      <CustomChatBox/>
    </div>
    <div className="fixed right-[18px] bottom-[18px] flex flex-col items-end">
      <ChatBoxButton
        apiUri={chatAPI}
      />
    </div>
    <Button onClick={() => {
      localStorage.removeItem('chainGPT');
    }}>Clear tip cache</Button>
  </div>;
}
