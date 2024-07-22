import { QuestionBox } from './QuestionBox';
import { AnswerBox } from './AnswerBox';
import React, { useEffect, useRef, useState } from 'react';
import {DotTyping} from './DotTyping';
import {ChatInput} from './ChatInput';

interface IChatItem {
  text: string | React.FC;
  type: 'question' | 'answer';
}

// TODO: Virtual list to hold the messages
// import VirtualList from 'rc-virtual-list';
export default function ChatBox({
                                  defaultList = [],
                                  Welcome,
                                  apiUri
                                }: {
  defaultList?: IChatItem[],
  Welcome?: React.FC,
  apiUri: string
}) {
  const [chatList, setChainList] = useState<IChatItem[]>(defaultList);
  const [searchDisable, setSearchDisable] = useState(false);

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
      const url = apiUri; //'/api/demos/chaingpt';
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
    if (bottomRef.current && 'scrollIntoView' in bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [chatList]);

  return <>
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full overflow-hidden">
        <div className="w-full h-full flex-1 overflow-scroll">
          <div className="w-full p-[8px] py-[16px] whitespace-pre-wrap break-normal text-wrap">
            {Welcome && <Welcome />}
            {chatList.map((item, index) => (
              <div key={index}>
                {item.type === 'question'
                  ? <QuestionBox>{Render(item.text)}</QuestionBox>
                  : <AnswerBox>{Render(item.text)}</AnswerBox>}
              </div>
            ))}
            <AnswerBox className={searchDisable ? 'block' : 'hidden'}><DotTyping loading={searchDisable}/></AnswerBox>
            <div ref={bottomRef}></div>
          </div>
        </div>
      </div>
      <div className="h-[60px] bg-white">
        <ChatInput sendMessage={onSearch}/>
      </div>
    </div>
  </>
}

function Render(input) {
  if (typeof input === 'string') {
    return input
  }
  return <input />
}
