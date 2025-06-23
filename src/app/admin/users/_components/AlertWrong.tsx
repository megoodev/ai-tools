import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteUser } from "@/lib/apiCashe/users"

import { XIcon } from "lucide-react"

const AlertWrong = ({ id, setDeleteItem }: { id: string, setDeleteItem: boolean }) => {
  const removeUser = (id: string) => {
    deleteUser(id).then(()=> {
      setDeleteItem(false)

    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 hover:bg-red-800 cursor-pointer"><XIcon /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => { removeUser(id) }} >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertWrong