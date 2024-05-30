'use client'
// `app/hello/page.tsx` is the UI for the `/hello` URL
export default function Page() {
  return <>
    <h1>Hello Page!</h1>
    <div onClick={() => {
      throw Error('click to throw error');
    }}>Click</div>
  </>
}
