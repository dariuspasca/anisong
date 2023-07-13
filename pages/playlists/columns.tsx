import { Playlist } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

export const playlistsColumns: ColumnDef<Playlist>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "public",
    header: "Public",
  },
]
