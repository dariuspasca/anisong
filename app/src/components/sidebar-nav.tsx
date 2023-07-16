import Link from "next/link"
import { usePathname } from "next/navigation"
import type { NavItem } from "@/types"

import { cn } from "@/lib/utils"
import Icons from "@/components/icons"

interface SidebarNavProps {
  items: NavItem[]
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2 ">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-300 dark:hover:text-slate-900",
                  path === item.href
                    ? "bg-slate-200 dark:bg-slate-200 dark:text-slate-800"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}

export default SidebarNav
