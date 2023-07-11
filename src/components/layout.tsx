import * as React from "react"

import { navigationConfig } from "@/config/navigationConfig"
import Header from "@/components/header"
import SidebarNav from "@/components/sidebar-nav"
import ThemeToggle from "@/components/theme-toggle"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <Header items={navigationConfig.navigationItems} />
          <ThemeToggle />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav items={navigationConfig.navigationItems} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
