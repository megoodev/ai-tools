
'use client'


import { getTools } from "@/lib/apiCashe/tools"
import { useEffect, useState } from "react"
import DeleteTool from "./DeleteTool"
import { toolWithRelation } from "@/utils/type"
import MainHeading from "@/components/MainHeading"

const GetTools = () => {
  const [tools, setTools] = useState([])
  const [length, setLength] = useState<Set<number>>(0)
  useEffect(() => {
    _getTools()

  }, [length])
  const _getTools = () => {
    getTools().then((res) => {
      setTools(res.data.tools)
      setLength(res.data.tools.length)
    })
  }
  return (
    <div className="grid grid-cols-1 gap-3.5 w-full mt-5">
      <MainHeading title="All Tools" />
      {tools.map((tool: toolWithRelation) => (
        <div key={tool?.id} className="p-5 bg-secondary rounded-sm w-[70vw] flex items-center justify-between">
          <div>
            <label className="w-50 ">{tool.name}</label>
          </div>
          <div>            <span>{tool.category.name}</span></div>
          <div>
            <DeleteTool setLength={setLength} length={length} id={tool.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default GetTools

