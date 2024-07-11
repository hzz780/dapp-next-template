"use client"
/**
 * <AntdRegistry>
 * If you are using the App Router in Next.js and using antd as your component library,
 * to make the antd component library work better in your Next.js application and provide a better user experience,
 * you can try using the following method to extract
 * and inject antd's first-screen styles into HTML to avoid page flicker.
 * https://ant.design/docs/react/use-with-next
 **/
import { Input, Spin } from 'antd';
const { Search } = Input;
import { QuestionBox } from '@/app/demos/chaingpt/components/QuestionBox';
import { AnswerBox } from '@/app/demos/chaingpt/components/AnswerBox';
import {useEffect, useRef, useState} from 'react';

interface IChatItem {
  text: string;
  type: 'question' | 'answer';
}

const defaultList: IChatItem[] =  [{"text":"the current price of ELF","type":"question"},{"text":"The current price of ELF (aelf) is $0.3994312670003399. Please note that cryptocurrency prices are highly volatile and can change rapidly. It's always a good idea to check the latest prices on a reliable cryptocurrency exchange or market data platform. Let me know if there's anything else I can help you with!","type":"answer"}];

// TODO: Virtual list to hold the messages
// import VirtualList from 'rc-virtual-list';
export default function Page() {
  const [chatList, setChainList] = useState<IChatItem[]>(defaultList);
  const [searchDisable, setSearchDisable] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const onSearch = async (value: string) => {
    console.log('value: ', value);
    if (value.trim().length <= 0) {
      return;
    }
    const question: IChatItem = {
      text: value,
      type: 'question'
    };
    const _list = [...chatList, question];
    setChainList(_list);
    setSearchDisable(true);

    const askChainGPT = async (question: string) => {
      const url = '/api/demos/chaingpt';
      let data;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      data = json.data;
      return data;
    };
    let answerMessage;
    try {
      answerMessage = await askChainGPT(value);
      setSearchInput('');
    } catch (error) {
      answerMessage = error instanceof Error ? error.message : 'Please try again';
    }
    const answer: IChatItem = {
      text: answerMessage,
      type: 'answer'
    };
    setChainList([..._list, answer]);
    setSearchDisable(false);
  };

  console.log('chatList', chatList, JSON.stringify(chatList));
  const bottomRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  return <>
    <div className="w-full h-full flex flex-col bg-white">
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-full flex-1 overflow-scroll">
          <div className="w-full p-4 whitespace-pre-wrap break-normal text-wrap">
            {/*<QuestionBox>Hello World</QuestionBox>*/}
            {/*<AnswerBox>Hello World hzz! aelf addresses interoperability with other blockchain networks through its multi-chain architecture and cross-chain communication protocols.*/}
            {/*  The aelf blockchain is designed to support seamless communication and data exchange between different blockchains. It achieves this by implementing a main chain and multiple side chains. The main chain handles general functions and acts as a bridge between the side chains. Each side chain is dedicated to specific applications or business scenarios, allowing for better scalability and performance.</AnswerBox>*/}
            {/*<QuestionBox>Hello World 2331111</QuestionBox>*/}
            {/*<QuestionBox>Hello World</QuestionBox>*/}
            {/*<AnswerBox>Hello World hzz! aelf addresses interoperability with other blockchain networks through its multi-chain architecture and cross-chain communication protocols.*/}
            {/*  The aelf blockchain is designed to support seamless communication and data exchange between different blockchains. It achieves this by implementing a main chain and multiple side chains. The main chain handles general functions and acts as a bridge between the side chains. Each side chain is dedicated to specific applications or business scenarios, allowing for better scalability and performance.</AnswerBox>*/}
            {/*<QuestionBox>Hello World 2331111</QuestionBox>*/}
            {chatList.map((item, index) => (
              <div key={index}>
                {item.type === 'question' ? <QuestionBox>{item.text}</QuestionBox> : <AnswerBox>{item.text}</AnswerBox>}
              </div>
            ))}
            <AnswerBox className={searchDisable ? 'block' : 'hidden'}><Spin spinning={searchDisable}/></AnswerBox>
            <div ref={bottomRef}></div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Search
          allowClear
          disabled={searchDisable}
          loading={searchDisable}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={onSearch}
          placeholder="Please input your question" />
      </div>
    </div>
  </>
}
