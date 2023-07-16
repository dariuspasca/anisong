import * as React from "react"
import Link from "next/link"
import { useIsAuthenticated } from "@refinedev/core"

import { navigationConfig } from "@/config/navigationConfig"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Header from "@/components/header"
import { SiteFooter } from "@/components/site-footer"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data } = useIsAuthenticated()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Header items={navigationConfig.navigationItems} />
          <nav>
            <Link
              href={data?.authenticated ? "/playlists" : "/login"}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              {data?.authenticated ? "Dashboard" : "Login"}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  )
}

export default Layout
