import Head from "next/head"
import Link from "next/link"
import { Playlist } from "@/types"
import { Authenticated, useTable } from "@refinedev/core"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import EmptyPlaceholder from "@/components/empty-placeholder"
import Layout from "@/components/layout"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import type { NextPageWithLayout } from "../_app"
import { playlistsColumns } from "./columns"

const PlaylistsPage: NextPageWithLayout = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Playlist>({
    meta: {
      select: "*, playlist_tracks(playlist_id)",
    },
  })

  const tableData = data?.data

  return (
    <Authenticated loading={<LoadingScreen />}>
      <Head>
        <title>Playlists | Anisong</title>
      </Head>

      <PagedShell>
        <PagedHeader heading="Your playlists">
          <Link
            href="/playlists/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            New Playlist
          </Link>
        </PagedHeader>

        <div>
          {isLoading && <div>Loading...</div>}

          {!isLoading && !tableData?.length ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="playlists" />
              <EmptyPlaceholder.Title>
                No playlists created
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any playlist. Start creating your first
                playlist.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          ) : (
            <DataTable columns={playlistsColumns} data={tableData ?? []} />
          )}
        </div>
      </PagedShell>
    </Authenticated>
  )
}

PlaylistsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default PlaylistsPage
