import Head from "next/head"
import Link from "next/link"
import type { Playlist } from "@/types"
import { useTable } from "@refinedev/core"
import { useDocumentTitle } from "@refinedev/nextjs-router"

import { siteConfig } from "@/config/siteConfig"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import ExploreFeed from "@/components/explore-feed"
import Layout from "@/components/layout"
import PlaylistCard from "@/components/playlist-card"

import type { NextPageWithLayout } from "./_app"

const IndexPage: NextPageWithLayout = () => {
  useDocumentTitle(`Anisong | ${siteConfig.description}`)

  const {
    tableQueryResult: { data: featuredPlaylists, isLoading },
  } = useTable<Playlist>({
    resource: "playlists",
    meta: { select: "*, playlist_tracks(playlist_id), profiles(id, username)" },
    filters: {
      mode: "server",
      permanent: [
        {
          field: "featured",
          operator: "eq",
          value: "true",
        },
      ],
    },
    pagination: {
      pageSize: 3,
    },
  })

  return (
    <>
      <Head>
        <meta name="description" content={siteConfig.description} />
      </Head>

      <section className=" space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Experience the nostalgia and excitement of anime
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Instantly create tailored anime playlists by simply choosing the
            anime you love and enjoying their iconic opening and ending tracks.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Featured playlists
          </h2>
        </div>
        <div className="mx-auto grid justify-center gap-4 pt-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {(featuredPlaylists?.data || []).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
    </>
  )
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default IndexPage
