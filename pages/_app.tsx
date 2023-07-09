import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine, GitHubBanner } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/nextjs-router";

import { dataProvider } from "@refinedev/supabase";
import { Layout } from "@components/layout";
import "@styles/global.css";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <>
      <GitHubBanner />
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(supabaseClient)}
          authProvider={authProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {renderComponent()}
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
