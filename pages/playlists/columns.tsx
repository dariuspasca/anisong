import { ColumnDef } from "@tanstack/react-table"

export interface Playlist {
  id: string
  title: string
  description: string
  profile_id: string
  public: boolean
}

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
