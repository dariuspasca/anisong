import * as React from "react"
import type { IUserIdentity } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetIdentity, useInvalidate } from "@refinedev/core"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { supabaseClient } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Icons from "@/components/icons"

const userNameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
})

type FormData = z.infer<typeof userNameSchema>

function AccountUsername() {
  const { data: userIdentity } = useGetIdentity<IUserIdentity>()
  const invalidate = useInvalidate()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
  })

  async function onSubmit(formData: FormData) {
    setIsSaving(true)
    const { error } = await supabaseClient
      .from("profiles")
      .update({ username: formData.username })
      .eq("id", userIdentity?.id)

    setIsSaving(false)
    if (error) {
      if (error.code === "23505") {
        setError("username", {
          type: "custom",
          message: "It looks like this username is already taken. Try another.",
        })
      } else {
        toast({
          title: "Something went wrong.",
          description: "Your username was not updated. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      invalidate({
        resource: "profiles",
        invalidates: ["detail"],
        id: userIdentity?.id,
      })
      toast({
        title: "Username updated successfully",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Your Username</CardTitle>
          <CardDescription>Update your username</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default AccountUsername
