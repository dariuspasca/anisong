import Head from "next/head"
import { Playlist, Track } from "@/types"
import { useShow, useTable } from "@refinedev/core"
import { NextPageWithLayout } from "pages/_app"

import { settingsConfig } from "@/config/settingsConfig"
import LoadingScreen from "@/components/loading"
import PlaylistViewer from "@/components/playlist-viewer"

const PlaylistShowPage: NextPageWithLayout = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow<Playlist>({
    meta: {
      select: "*, playlist_tracks(track_id)",
    },
  })

  const playlist = data?.data

  const {
    tableQueryResult: { data: tracks, isLoading: isLoadingTracks },
  } = useTable<Track>({
    resource: "tracks",
    meta: { select: "*, animes(*)" },
    filters: {
      mode: "server",
      permanent: [
        {
          field: "id",
          operator: "in",
          value: playlist?.playlist_tracks.map((track) => track.track_id) ?? [],
        },
      ],
    },
  })

  if (isLoading || isLoadingTracks) <LoadingScreen />

  return (
    <>
      <Head>
        <title>{playlist?.title} | Anisong</title>
        {playlist?.description && (
          <meta
            name="description"
            content={playlist?.description ?? settingsConfig.description}
          />
        )}
      </Head>

      <PlaylistViewer playlist={playlist} tracks={tracks?.data ?? []} />
    </>
  )
}

PlaylistShowPage.getLayout = function getLayout(page) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">{page}</div>
  )
}

export default PlaylistShowPage
