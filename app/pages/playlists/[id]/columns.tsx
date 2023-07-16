import type { Track } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"

export const tracksColumns: ColumnDef<Track>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "animes.title",
    header: "Anime",
  },
]
