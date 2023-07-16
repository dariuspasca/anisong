import * as React from "react"
import Image from "next/image"
import { type MalAnime } from "@/types"

import EmptyPlaceholder from "@/components/empty-placeholder"
import Icons from "@/components/icons"

interface AnimeListProps {
  animes: MalAnime[]
  onRemove: (anime: MalAnime) => void
}

const AnimeList = ({ animes, onRemove }: AnimeListProps) => {
  if (!animes.length) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="logo" />
        <EmptyPlaceholder.Title>
          Add an anime to your playlist
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Search for your favorite animes and add them to the list. We will than
          generate a playlist with opening/ending theme songs.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    )
  }
  return (
    <div className="animate-in fade-in-50 flex min-h-[400px] flex-col justify-start gap-5 rounded-md border border-dashed p-8 text-center">
      {animes.map((anime) => {
        return (
          <div className="flex justify-between gap-6" key={anime.node.id}>
            <Image
              src={anime.node.main_picture.medium}
              width={68}
              height={68}
              alt={`Cover image of anime ${anime.node.title}`}
            />
            <span className="flex grow items-start pt-4">
              {anime.node.title}
            </span>
            <div className="flex items-center">
              <Icons.close
                onClick={() => onRemove(anime)}
                className=" text-slate-200 hover:cursor-pointer hover:rounded-sm hover:border hover:bg-slate-700"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AnimeList
