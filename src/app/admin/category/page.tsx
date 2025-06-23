import MainHeading from "@/components/MainHeading"
import AddCategory from "./_components/AddCategory"
import GetCategories from "./_components/GetCategories"

const page = () => {
  return (
    <div className="h-full w-full me-20 p-5">
      <div className="flex justify-center">
        <MainHeading title="Category" />
      </div>
      <GetCategories />
      <AddCategory />
    </div>
  )
}

export default page