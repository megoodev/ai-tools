'use client'

import SubHeading from "@/components/SubHeading"
import { categoryWithRelation } from "@/utils/type"
import { useEffect, useState } from "react"
import ToolItem from "../../../components/ToolItem"
import { getCategories } from "@/lib/apiCashe/categories"
import { getfavorites } from "@/lib/apiCashe/favorite"
import { setFavorite } from "@/utils/rtk/FavoriteSlice"
import { useDispatch } from "react-redux"

const ToolsCard = () => {

  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])

  const _getFavorites = () => {
    getfavorites().then((res) => {
      dispatch(setFavorite(res.data.data))
    })
  }
  useEffect(() => {
    getCategory_()
    _getFavorites()
  }, [])
  
  const getCategory_ = () => {
    getCategories().then((res) => setCategories(res.data.categories))
  }
  return (
    categories.map((category: categoryWithRelation) => (
      <section key={category?.id}>
        <SubHeading title={category?.name} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-30 my-20">
          {
            category.tools.map((tool) => (<ToolItem key={tool.id} tool={tool} />))
          }
        </div>


      </section>
    ))
  )
}
export default ToolsCard