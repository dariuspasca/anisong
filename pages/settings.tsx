import Head from "next/head"
import { Authenticated } from "@refinedev/core"

import { settingsConfig } from "@/config/settingsConfig"
import { DeleteAccount } from "@/components/delete-account"
import Layout from "@/components/layout"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import { NextPageWithLayout } from "./_app"

const SettingsPage: NextPageWithLayout = () => {
  return (
    <Authenticated loading={<LoadingScreen />}>
      <Head>
        <title>{settingsConfig.name} | Anisong</title>
      </Head>

      <PagedShell>
        <PagedHeader
          heading={settingsConfig.name}
          text={settingsConfig.description}
        />
      </PagedShell>
      <DeleteAccount />
    </Authenticated>
  )
}

SettingsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default SettingsPage
