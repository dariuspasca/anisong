import type { Icons } from "~/components/icons"
import { MalAnime } from "supabase/functions/search-anime"

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
  github: string
}

export type PageConfig = {
  name: string
  description: string
}

interface IUserIdentity {
  id?: BaseKey
  username?: string
  name: string
  email: string
  user_metadata: {
    avatar_url: string
  }
}

export interface Playlist {
  id: string
  title: string
  description: string
  profile_id: string
  public: boolean
  playlist_tracks: { track_id: string }[]
}

export interface Track {
  id: string
  title: string
  author: string
  anime_id: string
  mal_id: string
  animes: MalAnime["node"]
}
