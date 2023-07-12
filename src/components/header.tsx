import * as React from "react"
import Link from "next/link"
import { MenuContext } from "@/context/menu-context"
import type { NavItem } from "@/types"

import { siteConfig } from "@/config/siteConfig"
import Icons from "@/components/icons"

import { MobileNav } from "./mobile-nav"

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

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => toggleFunction(!toggle)}
      >
        {toggle ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
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
