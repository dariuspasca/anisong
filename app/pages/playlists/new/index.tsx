import Head from "next/head"
import { Authenticated } from "@refinedev/core"
import type { NextPageWithLayout } from "pages/_app"

import LoadingScreen from "@/components/loading"
import NewPlaylistForm from "@/components/new-playlist-form"

const NewPlaylistPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>New playlist | Anisong</title>
      </Head>
      <Authenticated loading={<LoadingScreen />}>
        <NewPlaylistForm />
      </Authenticated>
    </>
  )
}

NewPlaylistPage.getLayout = function getLayout(page) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">{page}</div>
  )
}

export default NewPlaylistPage
