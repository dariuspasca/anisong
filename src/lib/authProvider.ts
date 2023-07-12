import { AuthBindings } from "@refinedev/core"
import nookies from "nookies"

import { supabaseClient } from "@/lib/supabaseClient"

interface AuthInfo {
  type: "email" | "github"
  email?: string
  redirect: boolean
}

export const authProvider: AuthBindings = {
  login: async (auth: AuthInfo) => {
    try {
      if (auth.type === "github") {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: "github",
        })

        if (error) {
          throw error
        }
      } else if (auth.type === "email" && auth.email) {
        const { error } = await supabaseClient.auth.signInWithOtp({
          email: auth.email,
        })

        if (error) {
          throw error
        }
      }

      return {
        success: true,
      }
    } catch (e: any) {
      alert(e.message)
      return {
        success: false,
        e,
      }
    }
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      return {
        success: false,
        error,
      }
    }

    return {
      success: true,
      redirectTo: "/login",
    }
  },

  check: async () => {
    const { data } = await supabaseClient.auth.getUser()
    const { user } = data

    if (user) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    }
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser()

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      }
    }

    return null
  },
  onError: async (error) => {
    console.error(error)
    return { error }
  },
}
