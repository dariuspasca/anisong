import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/siteConfig"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Layout from "@/components/layout"

import type { NextPageWithLayout } from "./_app"

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Anisong | {siteConfig.description}</title>
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
    </>
  )
}

IndexPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default IndexPage
