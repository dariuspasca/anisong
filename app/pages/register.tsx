import Link from "next/link"
import { useGo, useIsAuthenticated } from "@refinedev/core"
import { useDocumentTitle } from "@refinedev/nextjs-router"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import AuthForm from "@/components/auth-form"
import Icons from "@/components/icons"
import LoadingScreen from "@/components/loading"

import type { NextPageWithLayout } from "./_app"

const RegisterPage: NextPageWithLayout = () => {
  useDocumentTitle("Login | Anisong")
  const { isLoading, data } = useIsAuthenticated()
  const go = useGo()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (data?.authenticated) {
    go({ to: "/playlists", type: "replace" })
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
        </div>
        <AuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
