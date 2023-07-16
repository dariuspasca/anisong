import { type Playlist } from "@/types"

import PlaylistCard from "./playlist-card"

interface ExploreFeedProps {
  playlists: Playlist[]
}

function ExploreFeed({ playlists }: ExploreFeedProps) {
  return (
    <div className="flex gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard playlist={playlist} />
      ))}
    </div>
  )
}

export default ExploreFeed
