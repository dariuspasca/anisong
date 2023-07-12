import * as React from "react"
import { MalResponse } from "supabase/functions/search-anime"

import { supabaseClient } from "@/lib/supabaseClient"

import { useDebounce } from "./use-debounce"

function useSearchAnime() {
  const [isSearching, setIsSearching] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [animes, setAnimes] = React.useState<MalResponse["data"]>([])

  const debounceSearchValue = useDebounce(searchValue, 1000)

  const setSearchText = (text: string) => {
    setIsSearching(true)
    setSearchValue(text)
  }

  React.useEffect(() => {
    async function fetchData() {
      const res = await supabaseClient.functions.invoke<MalResponse["data"]>(
        "search-anime",
        {
          body: { text: debounceSearchValue },
        }
      )
      setIsSearching(false)
      setAnimes(res?.data ?? [])
    }
    fetchData()
  }, [debounceSearchValue])

  return { setSearchText, isSearching, animes }
}

export default useSearchAnime
