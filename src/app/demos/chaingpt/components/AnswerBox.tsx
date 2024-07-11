export function AnswerBox({
                     children, // will be a page or nested layout
                   }: {
  children: React.ReactNode
}) {
  return <div className="w-auto h-auto flex flex-col items-start mb-4">
    <div className="w-auto h-auto lg:text-base text-sm p-2 px-4">
      {children}
    </div>
  </div>
}
