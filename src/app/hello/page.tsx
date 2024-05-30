'use client'
const DynamicChartComponent = dynamic(() => import('./bridgeC'), {
  ssr: false,
});
import dynamic from 'next/dynamic';
export default function Page() {

  return <>
    <h1>Hello Page!</h1>
    <DynamicChartComponent />
  </>
}
