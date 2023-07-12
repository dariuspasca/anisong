import Head from "next/head"
import { useShow } from "@refinedev/core"
import { NextPageWithLayout } from "pages/_app"

import Layout from "@/components/layout"

import { Playlist } from "../columns"

const PlaylistShowPage: NextPageWithLayout = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow<Playlist>()

  const postData = data?.data

  return (
    <>
      <Head>
        <title>{postData?.title} | Anisong</title>
        {postData?.description && (
          <meta name="description" content={postData?.description} />
        )}
      </Head>

      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <h1>{postData?.title}</h1>
            <p>{postData?.description}</p>
          </>
        )}
      </div>
    </>
  )
}

PlaylistShowPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default PlaylistShowPage
