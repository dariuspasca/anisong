import * as React from "react"
import type { IUserIdentity } from "@/types"
import { type MalAnime, type TrackResponse } from "@/types"
import { useGetIdentity, useGo } from "@refinedev/core"

import { supabaseClient } from "@/lib/supabaseClient"

function useCreatePlaylist() {
  const { data: userIdentity } = useGetIdentity<IUserIdentity>()
  const [isLoading, setIsLoading] = React.useState(false)
  const go = useGo()

  async function createPlaylist(title: string, animes: MalAnime[]) {
    setIsLoading(true)
    const animeIds = animes.map((anime) => String(anime.node.id))
    const tracks = await fetchAnimeTracks(animeIds)

    try {
      const newAnimes = await addAnimes(animes)
      const newTracks = await addTracks(tracks, newAnimes!)

      const { data: playlist, error: playlistError } = await supabaseClient
        .from("playlists")
        .insert({ title, profile_id: userIdentity?.id })
        .select("id")

      if (playlistError) {
        throw playlistError
      }

      await addTracksToPlaylist(newTracks || [], playlist[0].id)

      go({ to: `/playlists/show/${playlist[0].id}` })

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.error(err)
    }
  }

  return { isLoading, createPlaylist }
}

export default useCreatePlaylist

async function fetchAnimeTracks(ids: string[]) {
  const res = await supabaseClient.functions.invoke<TrackResponse[]>(
    "get-song",
    {
      body: { malIds: ids },
    }
  )
  return res.data ?? []
}

async function addAnimes(animes: MalAnime[]) {
  try {
    const { error: upsertError } = await supabaseClient.from("animes").upsert(
      animes.map((anime) => ({
        title: anime.node.title,
        mal_id: anime.node.id,
        main_picture: anime.node.main_picture,
      })),
      {
        onConflict: "title",
        ignoreDuplicates: true,
      }
    )

    if (upsertError) {
      throw upsertError
    }

    // Upsert doesn't return existing data, only newly added
    const { data, error: selectError } = await supabaseClient
      .from("animes")
      .select("id,mal_id")
      .in(
        "mal_id",
        animes.map((anime) => anime.node.id)
      )

    if (selectError) {
      throw selectError
    }

    const newlyAddedAnimes = data?.reduce((acc, val) => {
      return { ...acc, [val.mal_id]: val.id }
    }, {})
    return newlyAddedAnimes
  } catch (err) {
    console.error(err)
  }
}

async function addTracks(
  tracks: TrackResponse[],
  animesList: { [key: string]: number }
) {
  try {
    const { error: tracksError } = await supabaseClient.from("tracks").upsert(
      tracks.map((track) => ({
        title: track.title,
        author: track.author,
        mal_id: track.id,
        anime_id: animesList[track.anime_mal_id],
      })),
      {
        onConflict: "mal_id",
        ignoreDuplicates: true,
      }
    )
    if (tracksError) {
      throw tracksError
    }

    const { data, error: selectError } = await supabaseClient
      .from("tracks")
      .select("id")
      .in("anime_id", Object.values(animesList))

    if (selectError) {
      throw selectError
    }

    return data.map((track) => track.id)
  } catch (err) {
    console.log(err)
  }
}

async function addTracksToPlaylist(tracks: string[], playlistId: string) {
  try {
    const { data, error: upsertError } = await supabaseClient
      .from("playlist_tracks")
      .upsert(
        tracks.map((track) => ({
          track_id: track,
          playlist_id: playlistId,
        }))
      )

    if (upsertError) {
      throw upsertError
    }
  } catch (err) {
    console.error(err)
  }
}
