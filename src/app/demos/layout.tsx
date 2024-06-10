import Link from 'next/link';
import NavLinks from '@/app/ui/demos/nav-links/page';
import {NickNameItem} from '@/app/demos/redux/nickName/NickNameItem';
import {WalletConnectItem} from '@/app/demos/redux/walletConnect/WalletConnectItem';

function SideBarItem ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <div className="border-b border-b-indigo-500">
    {children}
  </div>
}

export default function HelloLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex min-h-screen min-w-full break-all">
      {/* Include shared UI here e.g. a header or sidebar */}
      {/*<nav></nav>*/}
      <div className="hidden md:flex flex-col w-1/6 bg-indigo-300">
        <SideBarItem><Link href="/demos">demo home</Link></SideBarItem>
        <SideBarItem><Link href="/demos?id=12345">demo home with search params</Link></SideBarItem>
        <SideBarItem><Link href="/demos/tailwind">tailwind</Link></SideBarItem>
        <SideBarItem><Link href="/demos/image">image desktop and mobile</Link></SideBarItem>
        <SideBarItem><Link href="/demos/fonts">fonts</Link></SideBarItem>
        <SideBarItem><Link href="/demos/sentry">sentry</Link></SideBarItem>
        <SideBarItem><Link href="/demos/aelf-web3/sdk">aelf-web3 sdk</Link></SideBarItem>
        <SideBarItem><Link href="/demos/aelf-design">aelf-design</Link></SideBarItem>
        <SideBarItem><Link href="/demos/redux">Redux Toolkit</Link></SideBarItem>
        <SideBarItem><Link href="/demos/file-upload">file-upload</Link></SideBarItem>
        <SideBarItem><Link href="/demos/web-login">web login</Link></SideBarItem>
        <SideBarItem><Link href="/demos/jest">jest</Link></SideBarItem>
        <div>
          <p>Show link path here</p>
          <NavLinks />
        </div>
        <NickNameItem/>
        <WalletConnectItem/>
      </div>
      <div className="flex-initial w-5/6">{children}</div>
    </section>
  )
}
