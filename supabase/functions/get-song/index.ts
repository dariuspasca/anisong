import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

import { corsHeaders } from "../_shared/cors.ts"
import { type MalAnimeTrack, type TrackResponse } from "./types"

console.log(`Function "get-song" up and running!`)
const MAL_API_KEY = Deno.env.get("MAL_API_KEY") ?? ""

interface MalAnime {
  id: number
  opening_themes?: Array<MalAnimeTrack>
  ending_themes?: Array<MalAnimeTrack>
}

const malFetchConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-MAL-CLIENT-ID": MAL_API_KEY,
  },
}

const titleReg = new RegExp('(?<=")(.*?)(?=")')
const authorReg = new RegExp("(?<=by\\s+)(.*?)(?=$|\\s+\\()")

function ParseTrack(
  track: MalAnimeTrack,
  animeMalId: number
): TrackResponse | undefined {
  const unparsedSong = track.text
  const title = titleReg.exec(unparsedSong)
  if (title) {
    const author = authorReg.exec(unparsedSong)
    return {
      title: title[0],
      author: author ? author[0] : undefined,
      id: track.id,
      anime_mal_id: animeMalId,
    }
  }
  return undefined
}

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { malIds }: { malIds: string[] } = await req.json()

    const urlTemplate =
      "https://api.myanimelist.net/v2/anime/<malId>?fields=opening_themes%2Cending_themes"
    const promises: Promise<MalAnime>[] = malIds.map((id: string) => {
      const url = urlTemplate.replace("<malId>", id.toString())

      return fetch(url, malFetchConfig).then((res) => res.json())
    })

    const results: MalAnime[] = await Promise.all(promises)

    const animesTracks = results.map((anime) => {
      let tracksList: Array<MalAnimeTrack> = []
      if (anime.opening_themes) {
        tracksList = tracksList.concat(anime.opening_themes)
      }
      if (anime.ending_themes) {
        tracksList = tracksList.concat(anime.ending_themes)
      }

      const tracks = tracksList.map((track) => {
        return ParseTrack(track, anime.id)
      })

      return tracks
    })

    return new Response(JSON.stringify(animesTracks.flat().filter(Boolean)), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
