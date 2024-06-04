// need to turn nav-links.tsx into a Client Component.
'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return <>
    <p>path: {pathname}</p>
    <p>searchParams: {searchParams}</p>
  </>
}
