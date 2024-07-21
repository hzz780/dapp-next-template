import Image from 'next/image';
import ChainGPTIcon from '@/assets/chain-gpt/icon.svg';
import React from 'react';

export function ChainGPTLogo() {
  return <>
    <Image
      src={ChainGPTIcon}
      alt="chainGPT close"
      className="w-[64px] h-[64px]"
    />
  </>
}
