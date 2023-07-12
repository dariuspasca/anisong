import Head from "next/head"
import { Authenticated, useTable } from "@refinedev/core"

import Layout from "@/components/layout"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import type { NextPageWithLayout } from "../_app"
import { Playlist, playlistsColumns } from "./columns"
import { PlaylistsDataTable } from "./data-table"

const PlaylistsPage: NextPageWithLayout = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<Playlist>()
  console.log("🚀 ~ file: index.tsx:20 ~ data:", data)

  const tableData = data?.data

  return (
    <Authenticated loading={<LoadingScreen />}>
      <Head>
        <title>Playlists | Anisong</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>

      <PagedShell>
        <PagedHeader heading="Your playlists" />

        <div className="flex">
          <PlaylistsDataTable
            columns={playlistsColumns}
            data={tableData ?? []}
          />
        </div>
      </PagedShell>
    </Authenticated>
  )
}

PlaylistsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default PlaylistsPage