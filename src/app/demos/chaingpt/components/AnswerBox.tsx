import Image from 'next/image';
import ChainGPTIcon from '@/assets/chain-gpt/icon-2.svg';
import React from 'react';

export function AnswerBox({
                            children,
                            className
                          }: {
  children: React.ReactNode,
  className?: string
}) {
  return <div className={`w-auto h-auto flex flex-col items-start mb-4 ${className}`}>
    <div className="w-auto h-auto lg:text-base text-sm flex flex-row">
      <div><ChainGPTLogo/></div>
      <div className="flex-1 ml-[8px]">{children}</div>
    </div>
  </div>
}

function ChainGPTLogo() {
  return <>
    <Image
      src={ChainGPTIcon}
      alt="chainGPT close"
      className="w-[32px] h-[32px]"
    />
  </>
}
