import { Playlist } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

import { PlaylistActions } from "@/components/playlist-actions"

export const playlistsColumns: ColumnDef<Playlist>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "playlist_tracks",
    header: "Tracks",
    cell: ({ row }) => {
      const tracks: Playlist["playlist_tracks"] =
        row.getValue("playlist_tracks")

      return tracks.length
    },
  },
  {
    accessorKey: "public",
    header: "Visibility",
    cell: ({ row }) => {
      const isPublic: boolean = row.getValue("public")

      return (
        <div className="w-[65px] rounded-md bg-muted-foreground  text-center text-muted">
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
