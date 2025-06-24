import MainHeading from "@/components/MainHeading"
import AddCategory from "./_components/AddCategory"
import GetCategories from "./_components/GetCategories"

const page = () => {
  return (
    <div className="h-full w-full me-20 p-5">
      <AddCategory />
      <GetCategories />
    </div>
  )
}

export default page