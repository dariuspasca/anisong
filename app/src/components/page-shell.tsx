import * as React from "react"

import { cn } from "@/lib/utils"

type PagedShellProps = React.HTMLAttributes<HTMLDivElement>

const PagedShell = ({ children, className, ...props }: PagedShellProps) => {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}

export default PagedShell
