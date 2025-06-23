'use client'
import { category } from "@prisma/client"
import { useEffect, useState } from "react"
import AlertWrong from "./AlertWrong"

import { Button } from "@/components/ui/button"
import { UpdateCategory } from "./UpdateCategory"
import { getCategories } from "@/lib/apiCashe/categories"


const GetCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.categories)
    })
  }, [categories])

  return (
    <section>
      <ul>
        {categories.map((category: category) => (
          <li className="bg-secondary mb-5 p-3 list-decimal flex justify-between  rounded-sm" key={category.id}>
            {category.name}
            <div className="flex items-center gap-2">
              <Button variant='secondary' className="cursor-pointer"><UpdateCategory id={category.id} /></Button>
              <AlertWrong id={category.id} />
            </div>
          </li>
        ))}
      </ul>

    </section>
  )
}

export default GetCategories