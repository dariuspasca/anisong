import * as React from "react"
import Link from "next/link"
import type { Playlist, Track } from "@/types"
import { tracksColumns } from "pages/playlists/[id]/columns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import EmptyPlaceholder from "@/components/empty-placeholder"
import Icons from "@/components/icons"

interface PlaylistViewerProps {
  playlist: Playlist
  tracks: Track[]
}

const PlaylistViewer = ({ playlist, tracks }: PlaylistViewerProps) => {
  if (!tracks.length) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="logo" />
        <EmptyPlaceholder.Title>This playlist is empty</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          We couldn&apos;t find any songs for this playlist (╥﹏╥)
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    )
  }

  return (
    <div className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link
            href="/playlists"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </div>
      </div>
      <div className="container mx-auto grid gap-8">
        <div className="space-y-1">
          <h3 className="flex w-full resize-none appearance-none flex-row items-center gap-1 text-sm font-medium focus:outline-none">
            by
            <div className=" rounded-md bg-pink-600 px-2 text-slate-200">
              {playlist.profiles.username}
            </div>
          </h3>
          <h1 className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none">
            {playlist.title}
          </h1>
          <h2 className="w-full resize-none appearance-none overflow-hidden bg-transparent text-xl font-medium focus:outline-none">
            {playlist.description}
          </h2>
        </div>
        <div className="mt-">
          <DataTable columns={tracksColumns} data={tracks} />
        </div>
      </div>
    </div>
  )
}

export default PlaylistViewer
