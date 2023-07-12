import Head from "next/head"
import { NextPageWithLayout } from "pages/_app"

import Layout from "@/components/layout"

const NewPlaylistPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>New playlist | Anisong</title>
      </Head>

      <div>new</div>
    </>
  )
}

NewPlaylistPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default NewPlaylistPage
