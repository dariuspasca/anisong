import { IUserIdentity, Profile } from "@/types"
import { HttpError, useLogout, useOne } from "@refinedev/core"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Icons from "@/components/icons"

interface UserAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  user: IUserIdentity
}

export function UserAccount({ user }: UserAccountProps) {
  const { mutate: logout } = useLogout()

  const { data: profile } = useOne<Profile, HttpError>({
    resource: "profiles",
    id: user.id,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          {user.user_metadata.avatar_url ? (
            <AvatarImage alt="Picture" src={user.user_metadata.avatar_url} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{user.name}</span>
              <Icons.user className="h-4 w-4" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {profile?.data.username && (
              <p className="font-medium">{profile.data.username}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            logout({ redirectPath: "/" })
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
