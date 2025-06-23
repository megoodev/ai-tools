'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCategory } from "@/lib/apiCashe/categories"
import { Label } from "@radix-ui/react-dropdown-menu"
import { FormEvent, useState } from "react"

const AddCategory = () => {
  const [name, setName] = useState('')

  const _createCategory = (e: FormEvent) => {
    e.preventDefault()

    createCategory(name).then(() => {
      setName('')
    }).catch((error) => {
      console.error(error)
    })
  }
  return (
    <form onSubmit={(e) => { _createCategory(e) }} className="flex gap-3 w-full  justify-between items-center bg-secondary rounded-sm p-5">
      <Label className="block w-[160px]">category name: </Label>
      <Input value={name} onChange={(e) => { setName(e.target.value) }} type="text" />
      <Button type="submit" className="cursor-pointer">Create</Button>
    </form>
  )
}

export default AddCategory