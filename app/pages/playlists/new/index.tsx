import { Authenticated } from "@refinedev/core"
import { useDocumentTitle } from "@refinedev/nextjs-router"
import type { NextPageWithLayout } from "pages/_app"

import LoadingScreen from "@/components/loading"
import NewPlaylistForm from "@/components/new-playlist-form"

const NewPlaylistPage: NextPageWithLayout = () => {
  useDocumentTitle("New playlist |Anisong")

  return (
    <Authenticated loading={<LoadingScreen />}>
      <NewPlaylistForm />
    </Authenticated>
  )
}

NewPlaylistPage.getLayout = function getLayout(page) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">{page}</div>
  )
}

export default NewPlaylistPage
