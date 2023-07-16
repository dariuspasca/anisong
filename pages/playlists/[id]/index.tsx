import Head from "next/head"
import { Playlist, Track } from "@/types"
import { useShow, useTable } from "@refinedev/core"
import { NextPageWithLayout } from "pages/_app"

import { settingsConfig } from "@/config/settingsConfig"
import { siteConfig } from "@/config/siteConfig"
import LoadingScreen from "@/components/loading"
import PlaylistUnavailable from "@/components/playlist-unavailable"
import PlaylistViewer from "@/components/playlist-viewer"

const PlaylistPage: NextPageWithLayout = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow<Playlist>({
    meta: {
      select: "*, playlist_tracks(track_id), profiles(username)",
    },
  })

  const playlist = data?.data

  function getPageTitle() {
    if (isLoading) {
      return siteConfig.name
    }
    if (playlist) {
      return `${playlist.title} | ${siteConfig.name}`
    }
    return `Playlist unavailable | ${siteConfig.name}`
  }

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
        <title>{getPageTitle()}</title>
        {playlist?.description && (
          <meta
            name="description"
            content={playlist?.description ?? settingsConfig.description}
          />
        )}
      </Head>
      {playlist ? (
        <PlaylistViewer playlist={playlist} tracks={tracks?.data ?? []} />
      ) : (
        <PlaylistUnavailable />
      )}
    </>
  )
}

PlaylistPage.getLayout = function getLayout(page) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">{page}</div>
  )
}

export default PlaylistPage
