import type { Playlist } from "@/types"

import { timeAgo } from "@/lib/time-ago"
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
  const updatedAt = timeAgo.format(new Date(playlist.updated_at))
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{playlist.title}</CardTitle>
          <CardDescription>{playlist.description}</CardDescription>
        </div>
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
          <div>Updated {updatedAt}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PlaylistCard
