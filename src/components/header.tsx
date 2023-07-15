import * as React from "react"
import Link from "next/link"
import { MenuContext } from "@/context/menu-context"
import type { NavItem } from "@/types"

import { siteConfig } from "@/config/siteConfig"
import { Button } from "@/components/ui/button"
import Icons from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface HeaderProps {
  items: NavItem[]
  children?: React.ReactNode
}

const Header = ({ items, children }: HeaderProps) => {
  const { toggle, toggleFunction } = React.useContext(MenuContext)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="hidden items-center space-x-2 md:flex"
        onClick={() => toggleFunction(!toggle)}
      >
        <Icons.logo />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      <Button
        type="button"
        className="flex items-center space-x-2 md:hidden"
        onClick={() => toggleFunction(!toggle)}
      >
        {toggle ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </Button>
      {toggle && (
        <MobileNav
          toggleFunction={toggleFunction}
          toggle={toggle}
          items={items}
        >
          {children}
        </MobileNav>
      )}
    </div>
  )
}

export default Header
