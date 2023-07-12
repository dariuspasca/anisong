import * as React from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@refinedev/react-hook-form"
import { MalAnime } from "supabase/functions/search-anime"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import SearchAnime from "@/components//search-anime"

const newPlaylistSchema = z.object({
  title: z.string().min(3, { message: "Required" }),
  description: z.string(),
})

type FormData = z.infer<typeof newPlaylistSchema>

function NewPlaylistForm() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newPlaylistSchema),
  })
  const [animes, setAnimes] = React.useState<MalAnime[]>([])
  console.log(
    "🚀 ~ file: new-playlist-form.tsx:31 ~ NewPlaylistForm ~ animes:",
    animes
  )

  async function onSubmit(data: FormData) {
    console.log(data)
  }

  const handleAnimeSelect = (anime: MalAnime) => {}

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
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
      </form>
    </div>
  )
}

export default NewPlaylistForm
