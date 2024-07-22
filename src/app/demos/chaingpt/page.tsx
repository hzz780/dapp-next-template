"use client"
/**
 * <AntdRegistry>
 * If you are using the App Router in Next.js and using antd as your component library,
 * to make the antd component library work better in your Next.js application and provide a better user experience,
 * you can try using the following method to extract
 * and inject antd's first-screen styles into HTML to avoid page flicker.
 * https://ant.design/docs/react/use-with-next
 **/
import React from 'react';
import {ChainGPTLogo} from '@/components/demo/ChainGPTChat/components/ChainGPTLogo';
import {TipBox} from '@/components/demo/ChainGPTChat/components/TipBox';
import {CustomChatBox} from '@/components/demo/ChainGPTChat/CustomChatBox';
import {Button} from 'antd';
// import { ChatBoxButton } from '@/components/demo/ChainGPTChat/ChatBoxButton';
import {MyComponent, ChatBoxButton} from 'chaingpt-component';

export default function Page() {
  return <div className="p-3 flex">
    <>
      <MyComponent/>
    </>
    <div>
      <TipBox />
      <ChainGPTLogo />
      <CustomChatBox/>
    </div>
    <div className="h-[700px] w-[500px] border-[1px] border-[#CCC] rounded ml-[16px] relative">
      <div className="absolute right-[8px] bottom-[8px] flex flex-col items-end">
        <ChatBoxButton
          apiUri="/api/demos/chaingpt"
        />
      </div>
    </div>
    <Button onClick={() => {
      localStorage.removeItem('chainGPT');
    }}>Clear tip cache</Button>
  </div>;
}
