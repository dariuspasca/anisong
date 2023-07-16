import type { SiteConfig } from "@/types"

import { getBaseUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "AniSong",
  description: "Your Personal Anime Playlist Creator",
  url: getBaseUrl(),
  github: "https://github.com/dariuspasca",
}
