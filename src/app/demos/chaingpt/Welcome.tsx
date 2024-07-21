import {AnswerBox} from '@/app/demos/chaingpt/components/AnswerBox';
import React from 'react';
function TextList({
                    children,
                  }: {
  children: React.ReactNode,
}) {
  return <p className="flex"><span className="text-[24px]">·</span>{children}</p>
}
export function Welcome() {
  return <AnswerBox>
    <div>
      Hi there! I&apos;m your AI assistant, here to help you explore and understand all about aelf!
      Ready to dive in? Here are a few things I can assist you with:
    </div>
    <div className="w-[1px] h-[16px]"></div>
    <div>
      <TextList> 🌟 “Tell me about aelf’s features.”</TextList>
      <TextList> 📈 “How can aelf improve my blockchain project?”</TextList>
      <TextList> 🛠️ “What tools and resources are available?”</TextList>
      <TextList> 🤝 “How do I get started with aelf?”</TextList>
    </div>
    <div className="w-[1px] h-[16px]"></div>
    <div>
      Ask me anything, and let’s get started!
    </div>
  </AnswerBox>
}
