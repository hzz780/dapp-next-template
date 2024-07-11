"use client"
/**
 * <AntdRegistry>
 * If you are using the App Router in Next.js and using antd as your component library,
 * to make the antd component library work better in your Next.js application and provide a better user experience,
 * you can try using the following method to extract
 * and inject antd's first-screen styles into HTML to avoid page flicker.
 * https://ant.design/docs/react/use-with-next
 **/
import { Input } from 'antd';
const { Search } = Input;
import { QuestionBox } from '@/app/demos/chaingpt/components/QuestionBox';
import { AnswerBox } from '@/app/demos/chaingpt/components/AnswerBox';
import {useState} from 'react';

interface IChatItem {
  text: string;
  type: 'question' | 'answer';
}

const defaultList: IChatItem[] =  [{"text":"the current price of ELF","type":"question"},{"text":"The current price of ELF (aelf) is $0.3994312670003399. Please note that cryptocurrency prices are highly volatile and can change rapidly. It's always a good idea to check the latest prices on a reliable cryptocurrency exchange or market data platform. Let me know if there's anything else I can help you with!","type":"answer"},{"text":"aelf是一个什么样的项目呢？","type":"question"},{"text":"aelf是一个基于区块链技术的项目，旨在构建一个面向Web3应用的云原生、高性能的区块链系统。它支持DeFi和元宇宙应用，并提供安全、快速和高效的环境。aelf采用多层侧链架构，以增强可扩展性和性能，使主链处理通用功能，而侧链支持特定应用。它使用委托权益证明（DPoS）共识机制，通过投票选出维护区块链的代表。aelf支持在隔离环境中使用C#智能合约，以实现安全和稳定性。其治理模型允许代币持有者参与决策，满足供应链管理和金融等领域的企业需求。aelf积极发展其生态系统，并与合作伙伴建立伙伴关系，以增强功能和扩展能力。\n\naelf的核心和实现遵循领域驱动设计（DDD）原则和最佳编程实践，特别是与C#和面向对象编程原则（如SOLID和DRY）一致的原则。它使用C#在dotnet core框架上开发，以实现高性能和跨平台支持。aelf使用ABP框架来处理区块链节点，使用XUnit进行单元测试，并使用自定义框架进行智能合约测试。它使用gRPC和Protobuf进行跨链和P2P通信，操作系统层处理高级网络事件和RPC实现，内核管理智能合约执行和数据访问，并支持侧链模块的插件。aelf的智能合约开发主要使用C#，同时还支持JavaScript、Java、Go和Lua等其他语言。开发人员可以通过适应gRPC的桥接通信来创建其他语言的SDK和运行时。","type":"answer"}];

// TODO: Virtual list to hold the messages
// import VirtualList from 'rc-virtual-list';
export default function Page() {
  const [chatList, setChainList] = useState<IChatItem[]>(defaultList);
  const [searchDisable, setSearchDisable] = useState(false);

  const onSearch = (value: string) => {
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

    const askChainGPT = async (question: string, callback: Function) => {
      const url = '/api/demos/chaingpt';
      let data;
      try {
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
      } catch (error) {
        console.error(error);
        data = error instanceof Error ? error.message : 'Please try again';
      }
      const answer: IChatItem = {
        text: data,
        type: 'answer'
      };
      callback([..._list, answer]);
    };
    askChainGPT(value, (list: IChatItem[]) => {
      console.log('list', list);
      setChainList(list);
      setSearchDisable(false);
    });
  };

  console.log('chatList', chatList, JSON.stringify(chatList));

  return <>
    {/*<div className="w-full h-svh border border-b-gray-300 lg:pb-36 pb-24 bg-white">*/}
    <div className="w-full h-full flex flex-col bg-white">
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-full flex-1 lg:pb-36 pb-24 overflow-scroll">
          {/*<div className="w-full lg:h-5/6 h-svh overflow-scroll p-4 bg-white">*/}
          <div className="w-full h-full p-4 whitespace-pre-wrap break-normal text-wrap">
            {/*<QuestionBox>Hello World</QuestionBox>*/}
            {/*<AnswerBox>Hello World hzz! aelf addresses interoperability with other blockchain networks through its multi-chain architecture and cross-chain communication protocols.*/}
            {/*  The aelf blockchain is designed to support seamless communication and data exchange between different blockchains. It achieves this by implementing a main chain and multiple side chains. The main chain handles general functions and acts as a bridge between the side chains. Each side chain is dedicated to specific applications or business scenarios, allowing for better scalability and performance.</AnswerBox>*/}
            {/*<QuestionBox>Hello World 2331111</QuestionBox>*/}
            {chatList.map((item, index) => (
              <div key={index}>
                {item.type === 'question' ? <QuestionBox>{item.text}</QuestionBox> : <AnswerBox>{item.text}</AnswerBox>}
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="p-4">
        <Search
          allowClear
          disabled={searchDisable}
          loading={searchDisable}
          onSearch={onSearch}
          placeholder="Please input your question" />
      </div>
    </div>
  </>
}
