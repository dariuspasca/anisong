import Link from "next/link"
import type { Playlist } from "@/types"
import ReactTimeAgo from "react-time-ago"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Icons from "@/components/icons"

interface PlaylistCardProps {
  playlist: Playlist
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Card className="flex h-[220px] flex-col justify-between rounded-md p-4">
      <CardHeader className="flex items-start gap-4 space-y-0">
        <CardTitle>
          <Link
            href={{
              pathname: "/playlists/[id]",
              query: { id: playlist.id },
            }}
            className=" hover:underline"
          >
            {playlist.title}
          </Link>
        </CardTitle>
        <CardDescription>{playlist.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icons.user className="mr-1 h-3 w-3 fill-pink-500" />
            {playlist.profiles.username}
          </div>
          <div className="flex items-center">
            <Icons.playlists className="mr-1 h-3 w-3" />
            {playlist.playlist_tracks.length}
          </div>
          <div className="text-sm">
            Updated{" "}
            <ReactTimeAgo
              date={new Date(playlist.updated_at)}
              locale="en-US"
              timeStyle="twitter"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlaylistCard
