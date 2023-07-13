import type { SiteConfig } from "@/types"

import { getBaseUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "AniSong",
  description: "Create your favorite animes playlist",
  url: getBaseUrl(),
}
