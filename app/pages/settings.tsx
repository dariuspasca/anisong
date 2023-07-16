import Head from "next/head"
import { Authenticated } from "@refinedev/core"

import { settingsConfig } from "@/config/settingsConfig"
import AccountDelete from "@/components/account-delete"
import AccountUsername from "@/components/account-username"
import AppLayout from "@/components/app-layout"
import LoadingScreen from "@/components/loading"
import PagedHeader from "@/components/page-header"
import PagedShell from "@/components/page-shell"

import type { NextPageWithLayout } from "./_app"

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
      <div className="mt-10">
        <AccountUsername />
        <AccountDelete />
      </div>
    </Authenticated>
  )
}

SettingsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default SettingsPage
