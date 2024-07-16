'use client';
import React from 'react';
import Image from 'next/image'
import LogoSVG from '@/assets/img/logo.svg';
import Link from 'next/link';
import {IMenuItem} from '@/components/Header/type';

const MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Demos',
    schema: '/demos'
  }
];

export default function Header() {
  return (
    // <section className="sticky top-0 left-0 z-[100] flex-shrink-0 px-4 lg:px-10 bg-white border-b-1 border-b-gray-300">
    <section className="fixed w-full top-0 left-0 z-[100] flex-shrink-0 px-4 lg:px-10 bg-white border-b-1 border-b-gray-300">
      <div className="h-[60px] lg:h-[80px] mx-auto flex justify-between items-center w-full">
        <Link href="/" className="flex flex-1 overflow-hidden justify-start items-center">
          <Image
            src={LogoSVG}
            alt="logo"
            className="w-[138px] h-[24px] lg:w-[184px] lg:h-[32px]"
          />
        </Link>
        <span className="space-x-8 xl:space-x-16 flex flex-row items-center">
          {MENU_ITEMS.map((item, index) => {
            const { title, schema } = item;
            return <Link href={schema} key={index}>{title}</Link>;
          })}
        </span>
      </div>
    </section>
  );
}
