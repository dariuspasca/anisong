import Link from "next/link"
import type { Playlist } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"

import { PlaylistActions } from "@/components/playlist-actions"

export const playlistsColumns: ColumnDef<Playlist>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const id: string = row.getValue("id")
      const title: boolean = row.getValue("title")

      return (
        <Link
          href={{
            pathname: "/playlists/[id]",
            query: { id },
          }}
          className=" hover:underline"
        >
          {title}
        </Link>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <span className="hidden md:flex">Description</span>
    },
    cell: ({ row }) => {
      const description: string = row.getValue("description")

      return <span className="hidden md:flex">{description}</span>
    },
  },
  {
    accessorKey: "playlist_tracks",
    header: ({ column }) => {
      return <span className="hidden md:flex">Tracks</span>
    },
    cell: ({ row }) => {
      const tracks: Playlist["playlist_tracks"] =
        row.getValue("playlist_tracks")

      return <span className="hidden md:flex">{tracks.length}</span>
    },
  },
  {
    accessorKey: "public",
    header: "Visibility",
    cell: ({ row }) => {
      const isPublic: boolean = row.getValue("public")

      return (
        <div className="w-[65px] rounded-md bg-pink-600  text-center text-slate-300">
          {isPublic ? "Public" : "Private"}
        </div>
      )
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return <PlaylistActions playlistId={row.getValue("id")} />
    },
  },
]
