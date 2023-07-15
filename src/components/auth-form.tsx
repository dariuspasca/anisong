import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "@refinedev/core"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Icons from "@/components/icons"

const userAuthSchema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof userAuthSchema>

function AuthForm() {
  const { toast } = useToast()
  const { mutate: login, isLoading } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(data: FormData) {
    login(
      {
        type: "email",
        email: data.email.toLowerCase(),
        redirectTo: "/playlists",
      },
      {
        onSuccess: () => {
          return toast({
            title: "Check your email",
            description: "We sent you a login link.",
          })
        },
        onError: () => {
          return toast({
            title: "Something went wrong.",
            description: "Your sign in request failed. Please try again.",
            variant: "destructive",
          })
        },
      }
    )
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button type="button" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={isLoading}
        onClick={() => {
          login({ type: "github", redirectTo: "/playlists" })
        }}
      >
        <Icons.github className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  )
}

export default AuthForm
