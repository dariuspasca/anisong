import * as React from "react"
import { type MalAnime } from "@/types"

import useSearchAnime from "@/hooks/use-search-anime"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Icons from "@/components/icons"

interface SearchAnimeProps {
  onSelect: (anime: MalAnime) => void
}

function SearchAnime({ onSelect }: SearchAnimeProps) {
  const [open, setOpen] = React.useState(false)
  const { searchValue, setSearchText, isSearching, animes, clear } =
    useSearchAnime()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Search anime...
          <Icons.search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            onValueChange={(search) => setSearchText(search)}
            placeholder="Search anime..."
          />
          {!isSearching && animes.length === 0 && searchValue !== "" && (
            <CommandEmpty>No anime found.</CommandEmpty>
          )}
          {isSearching && <CommandEmpty>Searching animes...</CommandEmpty>}

          <CommandList>
            {animes.map((anime) => {
              return (
                <CommandItem
                  key={anime.node.id}
                  value={anime.node.title}
                  onSelect={() => {
                    onSelect(anime)
                    setOpen(false)
                    clear()
                  }}
                >
                  {anime.node.title}
                </CommandItem>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchAnime
