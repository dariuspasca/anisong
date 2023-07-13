import { Track } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

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
