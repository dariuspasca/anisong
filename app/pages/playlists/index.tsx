import Head from "next/head"
import Link from "next/link"
import type { Playlist } from "@/types"
import { Authenticated, useTable } from "@refinedev/core"

import { playlistConfig } from "@/config/playlistConfig"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { playlistsColumns } from "@/components/ui/columns-playlist"
import AppLayout from "@/components/app-layout"
import { DataTable } from "@/components/data-table"
import EmptyPlaceholder from "@/components/empty-placeholder"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import type { NextPageWithLayout } from "../_app"

const PlaylistsPage: NextPageWithLayout = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Playlist>({
    meta: {
      select: "*, playlist_tracks(playlist_id)",
    },
    pagination: {
      pageSize: 100,
    },
  })

  const tableData = data?.data

  return (
    <Authenticated loading={<LoadingScreen />}>
      <Head>
        <title>{playlistConfig.name} | Anisong</title>
      </Head>

      <PagedShell>
        <PagedHeader
          heading={playlistConfig.name}
          text={playlistConfig.description}
        >
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
              <Link
                href="/playlists/new"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Create your first playlist
              </Link>
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
  return <AppLayout>{page}</AppLayout>
}

export default PlaylistsPage
