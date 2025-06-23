'use client'


import MainHeading from "@/components/MainHeading"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCategories } from "@/lib/apiCashe/categories"
import { createTool } from "@/lib/apiCashe/tools"
import { category } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CreateTools = () => {
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState(null)
  const router = useRouter()
  const [toolData, setToolData] = useState({
    name: '',
    description: '',
    categoryId: '',
    link: '',
  })
  useEffect(() => {
    getCategories().then((res) => setCategories(res.data.categories)
    )
  }, [])
  const _createTool = async () => {

    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', toolData.name)
    formData.append('description', toolData.description)
    formData.append('link', toolData.link)
    formData.append('categoryId', toolData.categoryId)


    createTool(formData).then(() => {
      router.push(window.location.pathname)
      setToolData({
        name: '',
        description: '',
        categoryId: '',
        link: '',
      })
    })
  }
  return (
    <div className=" w-[70vw]">
      <MainHeading title="Create Tool"/>
      <form className="bg-secondary rounded-md p-5" onSubmit={(e) =>{
        e.preventDefault()
        _createTool()
      }
        }>
      <div className="grid w-[100%] mb-5 max-w-sm items-center gap-3">
        <Label className="!w-25" htmlFor="name">tool name</Label>
        <Input onChange={(e) => setToolData({ ...toolData, name: e.target.value })} required className="w-[65vw]" type="text" id="name" placeholder="name" />
      </div>
      <div className="grid w-[100%] mb-5 max-w-sm items-center gap-3">
        <Label htmlFor="discription">discription</Label>
        <Input onChange={(e) => setToolData({ ...toolData, description: e.target.value })} required className="w-[65vw]" type="text" id="discription" placeholder="discription" />
      </div>
      <div className="grid w-full mb-5 max-w-sm items-center gap-3">
        <Label htmlFor="link">Link</Label>
        <Input onChange={(e) => setToolData({ ...toolData, link: e.target.value })} required className="w-[65vw]" type="url" id="link" placeholder="link" />
      </div>
      <div className="grid w-full mb-5 max-w-sm items-center gap-3">
        <Label className={`${buttonVariants(Button)} cursor-pointer w-[65vw]`} htmlFor="file">selet tool image</Label>
        <Input required className="hidden" type="file" id="file" onChange={(e) => setImage(e?.target?.files[0])} />
      </div>
      <div className="grid w-full mb-5 max-w-sm items-center gap-3">
        <Select onValueChange={(e) => setToolData({ ...toolData, categoryId: e })}>
          <SelectTrigger className="w-[65vw]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: category) => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-40 text-xl font-semibold">create</Button>
    </form>
    </div >
  )
}

export default CreateTools



