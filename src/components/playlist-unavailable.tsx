import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import EmptyPlaceholder from "@/components/empty-placeholder"
import Icons from "@/components/icons"

function PlaylistUnavailable() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <EmptyPlaceholder className="max-w-[500px]">
        <EmptyPlaceholder.Icon name="logo" />
        <EmptyPlaceholder.Title>
          Ops, playlist unavailable
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          This playlist might be private or it doesn&apos;t exists (╥﹏╥)
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </div>
  )
}

export default PlaylistUnavailable
