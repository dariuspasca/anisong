import * as React from "react"
import { IUserIdentity } from "@/types"
import { useGetIdentity } from "@refinedev/core"

import { navigationConfig } from "@/config/navigationConfig"
import { UserAccount } from "@/components/ui/user-account"
import Header from "@/components/header"
import SidebarNav from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/site-footer"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data: userIdentity } = useGetIdentity<IUserIdentity>()

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Header items={navigationConfig.navigationItems} />

          {userIdentity && <UserAccount user={userIdentity} />}
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav items={navigationConfig.navigationItems} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}

export default Layout
