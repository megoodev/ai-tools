import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tool } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

const DialogDemo = ({tool}: {tool: Tool}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Show Details</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[40%]">
          <DialogHeader className="w-[100%] relative h-[300px]">
            <Image src={tool.imageTool} fill alt="hi"/>
            
          </DialogHeader>
          <div className="grid gap-4">
            <DialogDescription>
              {tool.description}
            </DialogDescription>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button> <Link href={tool.link}>visit</Link></Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DialogDemo
