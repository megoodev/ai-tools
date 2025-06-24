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
import { toast } from "sonner"

const AlertWrong = ({ id }: { id: string }) => {

  const removeCategory = (id: string) => {
    deleteCategory(id).then((res)=> toast.success(res.data.msg)).catch((error) => toast.error(error.data.msg))}
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