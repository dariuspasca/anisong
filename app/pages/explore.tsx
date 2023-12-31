import { type Playlist } from "@/types"
import { Authenticated, useTable } from "@refinedev/core"
import { useDocumentTitle } from "@refinedev/nextjs-router"

import { exploreConfig } from "@/config/exploreConfig"
import AppLayout from "@/components/app-layout"
import ExploreFeed from "@/components/explore-feed"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import type { NextPageWithLayout } from "./_app"

const ExplorePage: NextPageWithLayout = () => {
  useDocumentTitle(`${exploreConfig.name} | Anisong`)

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
    pagination: {
      pageSize: 100,
    },
  })

  return (
    <Authenticated loading={<LoadingScreen />}>
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
