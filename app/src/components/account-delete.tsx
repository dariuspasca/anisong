import * as React from "react"
import { useLogout } from "@refinedev/core"

import { supabaseClient } from "@/lib/supabaseClient"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import Icons from "@/components/icons"

function AccountDelete() {
  const { mutate: logout } = useLogout()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <Card className="border-destructive mt-8">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Once you delete your account, there is no going back. Please be
            certain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setShowDeleteAlert(true)}
            variant="destructive"
          >
            Delete
          </Button>
        </CardContent>
      </Card>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const { error } = await supabaseClient.rpc("delete_user")

                setIsDeleteLoading(false)
                setShowDeleteAlert(false)

                if (error) {
                  toast({
                    title: "Something went wrong.",
                    description:
                      "Your playlist was not deleted. Please try again.",
                    variant: "destructive",
                  })
                } else {
                  logout({ redirectPath: "/" })
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AccountDelete
