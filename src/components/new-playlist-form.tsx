import * as React from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@refinedev/react-hook-form"
import { MalAnime } from "supabase/functions/search-anime"
import * as z from "zod"

import { cn } from "@/lib/utils"
import useCreatePlaylist from "@/hooks/use-create-playlist"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icons from "@/components/icons"
import SearchAnime from "@/components/search-anime"

const newPlaylistSchema = z.object({
  title: z.string().min(3, { message: "Required" }),
})

type FormData = z.infer<typeof newPlaylistSchema>

function NewPlaylistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newPlaylistSchema),
  })

  const [animes, setAnimes] = React.useState<MalAnime[]>([])
  const { isLoading, createPlaylist } = useCreatePlaylist()

  async function onSubmit(data: FormData) {
    createPlaylist(data.title, animes)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full">
          <div className="flex w-full">
            <Label className="sr-only" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Your kawaii playlist title"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              {...register("title")}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="mt-8 w-full">
          <SearchAnime onSelect={(anime) => setAnimes([...animes, anime])} />
        </div>
        <div className="mt-8 flex w-full flex-col gap-8">
          {animes.map((anime) => {
            return (
              <div className="flex items-center gap-5">
                <Image
                  src={anime.node.main_picture.medium}
                  width={68}
                  height={68}
                  alt={`Cover image of anime ${anime.node.title}`}
                />
                {anime.node.title}
              </div>
            )
          })}
        </div>
        <button type="submit" className={cn(buttonVariants(), "mt-10")}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </button>
      </form>
    </div>
  )
}

export default NewPlaylistForm
