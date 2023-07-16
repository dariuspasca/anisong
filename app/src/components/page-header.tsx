interface PagedHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

const PagedHeader = ({ heading, text, children }: PagedHeaderProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 px-2 md:flex-row">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
        {text && <p className="text-neutral-500">{text}</p>}
      </div>
      {children}
    </div>
  )
}

export default PagedHeader
