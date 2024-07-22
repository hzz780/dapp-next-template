// import Image from 'next/image';
import ChainGPTIcon from '../assets/icon.svg';
import React from 'react';

export function ChainGPTLogo() {
  return <>
    <img
      src={ChainGPTIcon.src}
      alt="chainGPT close"
      className="w-[64px] h-[64px]"
    />
  </>
}
