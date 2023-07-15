import type { SettingsConfig } from "@/types"

import { getBaseUrl } from "@/lib/utils"

export const settingsConfig: SettingsConfig = {
  name: "Settings",
  description: "Manage your account",
  url: getBaseUrl(),
}
