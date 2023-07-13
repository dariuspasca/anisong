import Head from "next/head"
import { NextPageWithLayout } from "pages/_app"

import NewPlaylistForm from "@/components/new-playlist-form"
import PagedHeader from "@/components/page-header"

const NewPlaylistPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>New playlist | Anisong</title>
      </Head>

      <NewPlaylistForm />
    </>
  )
}

NewPlaylistPage.getLayout = function getLayout(page) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">{page}</div>
  )
}

export default NewPlaylistPage
