export function QuestionBox({
    children, // will be a page or nested layout
  }: {
  children: React.ReactNode
}) {
  return <div className="w-full h-auto flex flex-col items-end mb-4">
    <div className="w-auto h-auto lg:text-base text-sm border border-gray-100 rounded-3xl p-2 px-4 bg-gray-100">
      {children}
    </div>
  </div>
}
