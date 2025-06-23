import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteCategory } from "@/lib/apiCashe/categories"
import { XIcon } from "lucide-react"

const AlertWrong = ({ id }: { id: string }) => {

  const removeCategory = (id: string) => {
    deleteCategory(id).catch((error) => {
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
          <AlertDialogDescription>
            By deleting the classification, all associated tools will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => { removeCategory(id) }} >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertWrong