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
import {ChainGPTLogo} from '@/app/demos/chaingpt/components/ChainGPTLogo';
import {TipBox} from '@/app/demos/chaingpt/components/TipBox';
import {CustomChatBox} from '@/app/demos/chaingpt/CustomChatBox';
import {Button} from 'antd';
import { ChatBoxButton } from '@/app/demos/chaingpt/ChatBoxButton';

export default function Page() {
  return <div className="p-3 flex">
    <div>
      <TipBox />
      <ChainGPTLogo />
      <CustomChatBox/>
    </div>
    <div className="h-[700px] w-[500px] border-[1px] border-[#CCC] rounded ml-[16px] relative">
      <div className="absolute right-[8px] bottom-[8px] flex flex-col items-end">
        <ChatBoxButton />
      </div>
    </div>
    <Button onClick={() => {
      localStorage.removeItem('chainGPT');
    }}>Clear tip cache</Button>
  </div>;
}
