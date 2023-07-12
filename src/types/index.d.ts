import type { Icons } from "~/components/icons"

export type NavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & {
  href: string
  items?: never
}

export type NavigationConfig = {
  navigationItems: NavItem[]
}

export type SiteConfig = {
  name: string
  description: string
  url: string
}

interface IUserIdentity {
  id?: BaseKey
  username?: string
  name: string
}
