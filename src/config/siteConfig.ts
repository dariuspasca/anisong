import type { SiteConfig } from "@/types"

import { getBaseUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "Anisong",
  description: "Generate your favorite animes playlist",
  url: getBaseUrl(),
}
