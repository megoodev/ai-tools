'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateCategory } from "@/lib/apiCashe/categories"
import { PenIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function UpdateCategory({ id }: { id: string }) {
  const [name, setName] = useState('')
  const update = () => {
    updateCategory(id, name).then((res) => {
      toast.success(res.data.msg)
      setName('')
    }).catch((error)=> toast.error(error.data.error))
  }
  return (
    <Dialog>
      <form >
        <DialogTrigger asChild>
          <Button variant="outline"><PenIcon /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>update Category</DialogTitle>
            <DialogDescription>
              you can Update just Category Name
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input required value={name} onChange={(e) => setName(e.target.value)} id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>

            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={() => update(id)}>Save changes</Button>

            </DialogClose>

          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
