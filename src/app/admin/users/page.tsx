import MainHeading from "@/components/MainHeading"
import GetUsers from "./_components/GetUsers"

const page = () => {
  return (
    <section>
      <div>
        <MainHeading title="Users"/>
      </div>
      <GetUsers />
    </section>
  )
}

export default page