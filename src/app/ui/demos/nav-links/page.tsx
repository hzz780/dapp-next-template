/**
 * 1. need to turn nav-links.tsx into a Client Component.
 * 2. with a Suspense boundary
 * https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 */
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

export default function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return <Suspense>
    <p>path: {pathname}</p>
    <p>searchParams: {searchParams}</p>
  </Suspense>
}
