import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { MalAnime } from "supabase/functions/search-anime"
import * as z from "zod"

import { cn } from "@/lib/utils"
import useCreatePlaylist from "@/hooks/use-create-playlist"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icons from "@/components/icons"
import SearchAnime from "@/components/search-anime"

import AnimeList from "./anime-list"
import { Switch } from "./ui/switch"

const newPlaylistSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Playlist title must be at least 3 characters long." }),
  description: z.string(),
  public: z.boolean(),
})

type FormData = z.infer<typeof newPlaylistSchema>

function NewPlaylistForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { public: true },
    resolver: zodResolver(newPlaylistSchema),
  })

  const [animes, setAnimes] = React.useState<MalAnime[]>([])

  const { isLoading, createPlaylist } = useCreatePlaylist()

  async function onSubmit(data: FormData) {
    if (animes.length) {
      createPlaylist(data.title, animes)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/playlists"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{isLoading ? "Creating" : "Create"}</span>
          </Button>
        </div>
        <div className="container mx-auto grid max-w-[600px] gap-8">
          <div className="space-y-2">
            <Label className="text-base" htmlFor="title">
              Playlist title
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
          <div className="space-y-2">
            <Label className="text-base" htmlFor="description">
              Playlist description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Brief description of the playlist"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              {...register("description")}
            />
            {errors?.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="public">
                Public
              </Label>
              <p className="text-sm text-muted-foreground">
                Make your playlist visible to everyone{" "}
              </p>
            </div>
            <Controller
              name="public"
              control={control}
              render={(props) => (
                <Switch
                  checked={props.field.value}
                  onCheckedChange={props.field.onChange}
                  aria-readonly
                  {...register("public")}
                />
              )}
            />
          </div>

          <div className="ml-auto">
            <SearchAnime onSelect={(anime) => setAnimes([...animes, anime])} />
          </div>
          <AnimeList
            animes={animes}
            onRemove={(animeToRemove) =>
              setAnimes(
                animes.filter(
                  (anime) => anime.node.id !== animeToRemove.node.id
                )
              )
            }
          />
        </div>
      </div>
    </form>
  )
}

export default NewPlaylistForm
