import * as React from "react"

import { siteConfig } from "@/config/siteConfig"
import { cn } from "@/lib/utils"
import Icons from "@/components/icons"

import ThemeToggle from "./theme-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-2 py-6 md:h-24 md:flex-row md:gap-4 md:py-0">
        <div className="flex flex-col items-center gap-2 px-8 md:flex-row md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              darius pasca
            </a>
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
