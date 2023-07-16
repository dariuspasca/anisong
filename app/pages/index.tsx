import Head from "next/head"
import Link from "next/link"
import { useIsAuthenticated } from "@refinedev/core"

import { siteConfig } from "@/config/siteConfig"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Icons from "@/components/icons"
import { SiteFooter } from "@/components/site-footer"

import type { NextPageWithLayout } from "./_app"

const IndexPage: NextPageWithLayout = () => {
  const { data } = useIsAuthenticated()

  return (
    <>
      <Head>
        <title>Anisong</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <header className="bg-background container z-40">
          <div className="flex h-20 items-center justify-between py-6">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
              <Icons.logo />
              <span className="hidden font-bold sm:inline-block">
                {siteConfig.name}
              </span>
            </Link>
            <nav>
              <Link
                href={data?.authenticated ? "/playlists" : "/login"}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                {data?.authenticated ? "Dashboard" : "Login"}
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                Create your favorite animes playlist
              </h1>
              <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
                Pick your favorite animes and we&apos;ll create a playlist with
                the opening/ending theme songs
              </p>
              <div className="space-x-4">
                <Link
                  href="/login"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

export default IndexPage
