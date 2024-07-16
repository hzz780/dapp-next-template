export function AnswerBox({
                            children,
                            className
                          }: {
  children: React.ReactNode,
  className?: string
}) {
  return <div className={`w-auto h-auto flex flex-col items-start mb-4 ${className}`}>
    <div className="w-auto h-auto lg:text-base text-sm p-2 px-4">
      {children}
    </div>
  </div>
}
