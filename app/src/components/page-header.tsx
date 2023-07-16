interface PagedHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

const PagedHeader = ({ heading, text, children }: PagedHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
        {text && <p className="text-neutral-500">{text}</p>}
      </div>
      {children}
    </div>
  )
}

export default PagedHeader
