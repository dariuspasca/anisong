import { type Playlist } from "@/types"

import PlaylistCard from "./playlist-card"

interface ExploreFeedProps {
  playlists: Playlist[]
}

function ExploreFeed({ playlists }: ExploreFeedProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

export default ExploreFeed
