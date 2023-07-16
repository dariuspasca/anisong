import type { ReactElement, ReactNode } from "react"
import React from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { MenuProvider } from "@/context/menu-context"
import { Refine } from "@refinedev/core"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router"
import { dataProvider } from "@refinedev/supabase"
import { ThemeProvider } from "next-themes"
import { authProvider } from "src/lib/authProvider"

import { supabaseClient } from "@/lib/supabaseClient"
import TailwindIndicator from "@/components/tailwind-indicator"

import "@/styles/global.css"

import { Toaster } from "@/components/ui/toaster"

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ThemeProvider attribute="class" enableSystem>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(supabaseClient)}
          authProvider={authProvider}
          resources={[
            {
              name: "playlists",
              list: "/playlists",
              show: "/playlists/:id",
              create: "/playlists/new",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            mutationMode: "optimistic",
          }}
        >
          <MenuProvider>
            {getLayout(<Component {...pageProps} />)}
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
            <TailwindIndicator />
            <Toaster />
          </MenuProvider>
        </Refine>
      </RefineKbarProvider>
    </ThemeProvider>
  )
}

export default MyApp
