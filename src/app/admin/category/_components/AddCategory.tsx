'use client'
import MainHeading from "@/components/MainHeading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCategory } from "@/lib/apiCashe/categories"
import { Label } from "@radix-ui/react-dropdown-menu"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

const AddCategory = () => {
  const [name, setName] = useState('')

  const _createCategory = (e: FormEvent) => {
    e.preventDefault()

    createCategory(name).then((res) => {
      toast.success(res.data.msg)
      setName('')
    }).catch((error) => {
      toast.error(error.data.erroe)
    })
  }
  return (
    <div>
      <MainHeading title="Create category"/>
      <form onSubmit={(e) => { _createCategory(e) }} className="flex mb-20 gap-3 w-full  justify-between items-center bg-secondary rounded-sm p-5">
        <Label className="block w-[160px]">category name: </Label>
        <Input value={name} onChange={(e) => { setName(e.target.value) }} type="text" />
        <Button type="submit" className="cursor-pointer">Create</Button>
      </form>
    </div>
  )
}

export default AddCategory