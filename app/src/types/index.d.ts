import type { MalAnime } from "supabase/functions/search-anime"

import type Icons from "@/components/icons"

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

export interface Profile {
  id: string
  username: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  profile_id: string
  public: boolean
  playlist_tracks: { track_id: string }[]
  profiles: Profile
  updated_at: string
}

export interface Track {
  id: string
  title: string
  author: string
  anime_id: string
  mal_id: string
  animes: MalAnime["node"]
}

export interface MalResponse {
  data: MalAnime[]
  paging: {
    next: string
  }
}

export interface MalAnime {
  node: {
    id: number
    title: string
    main_picture: {
      medium: string
      large: string
    }
  }
}

export interface MalAnimeTrack {
  id: number
  text: string
}

export interface TrackResponse {
  id: number
  title: string
  author?: string
  anime_mal_id: number
}
