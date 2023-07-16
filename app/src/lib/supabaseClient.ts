import { createClient } from "@refinedev/supabase"

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  }
)
