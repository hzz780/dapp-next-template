import Link from 'next/link';
import NavLinks from '@/app/ui/demos/nav-links/page';

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
    <section className="flex min-h-screen min-w-full">
      {/* Include shared UI here e.g. a header or sidebar */}
      {/*<nav></nav>*/}
      <div className="hidden md:flex flex-col w-1/6 bg-indigo-300">
        <SideBarItem><Link href="/demos">demo home</Link></SideBarItem>
        <SideBarItem><Link href="/demos?id=12345">demo home with search params</Link></SideBarItem>
        <SideBarItem><Link href="/demos/tailwind">tailwind</Link></SideBarItem>
        <SideBarItem><Link href="/demos/image">image desktop and mobile</Link></SideBarItem>
        <SideBarItem><Link href="/demos/sentry">sentry</Link></SideBarItem>
        <SideBarItem><Link href="/demos/aelf-web3/sdk">aelf-web3 sdk</Link></SideBarItem>
        <div>
          <p>Show link path here</p>
          <NavLinks />
        </div>
      </div>
      <div className="flex-initial w-5/6">{children}</div>
    </section>
  )
}
