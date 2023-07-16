import Head from "next/head"
import { type Playlist } from "@/types"
import { Authenticated, useTable } from "@refinedev/core"

import { exploreConfig } from "@/config/exploreConfig"
import AppLayout from "@/components/app-layout"
import ExploreFeed from "@/components/explore-feed"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import type { NextPageWithLayout } from "./_app"

const ExplorePage: NextPageWithLayout = () => {
  const {
    tableQueryResult: { data: playlists, isLoading },
  } = useTable<Playlist>({
    resource: "playlists",
    meta: { select: "*, playlist_tracks(playlist_id), profiles(id, username)" },
    filters: {
      mode: "server",
      permanent: [
        {
          field: "public",
          operator: "eq",
          value: "true",
        },
      ],
    },
  })

  return (
    <Authenticated loading={<LoadingScreen />}>
      <Head>
        <title>{exploreConfig.name} | Anisong</title>
      </Head>

      <PagedShell>
        <PagedHeader
          heading={exploreConfig.name}
          text={exploreConfig.description}
        />
      </PagedShell>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <ExploreFeed playlists={playlists?.data ?? []} />
        </div>
      )}
    </Authenticated>
  )
}

ExplorePage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default ExplorePage
