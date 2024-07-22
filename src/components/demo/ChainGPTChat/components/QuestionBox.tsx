export function QuestionBox({
    children, // will be a page or nested layout
  }: {
  children: React.ReactNode
}) {
  return <div className="w-full h-auto flex flex-col items-end mb-4">
    <div className="w-auto h-auto lg:text-base text-sm
    border border-[#E0E0E0] rounded-[12px_12px_4px_12px] p-2 px-4 bg-white text-[13px]
    py-[16px]
    ">
      {children}
    </div>
  </div>
}
