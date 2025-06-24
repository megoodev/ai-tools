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
import { reomveTool } from "@/lib/apiCashe/tools"
import { XIcon } from "lucide-react"
import { toast } from "sonner"

const DeleteTool = ({ id, setLength, length }: { id: string, setLength: Set<number> , length: number }) => {
  const _removeTool = ()=> {
    reomveTool(id).then((res)=> {
      toast.success(res.data.msg)
      setLength(length - 1)
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
          <AlertDialogAction onClick={() => _removeTool()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTool