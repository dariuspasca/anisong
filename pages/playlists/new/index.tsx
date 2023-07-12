import Head from "next/head"
import { NextPageWithLayout } from "pages/_app"

import Layout from "@/components/layout"
import NewPlaylistForm from "@/components/new-playlist-form"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

const NewPlaylistPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>New playlist | Anisong</title>
      </Head>

      <PagedShell>
        <PagedHeader heading="Create a new playlist" />

        <NewPlaylistForm />
      </PagedShell>
    </>
  )
}

NewPlaylistPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default NewPlaylistPage
