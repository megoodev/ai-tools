'use client'
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { uploadUserImage } from "@/lib/apiCashe/userImageUpload"
import { addUser, deleteUser } from "@/utils/rtk/userSlice"
import { Label } from "@radix-ui/react-dropdown-menu"
import { PenIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const UserDialog = () => {
  const [changeImage, setChangeImage] = useState(false)
  const user = useSelector(state => state?.user?.user[0])
  const router = useRouter()
  const logOut = () => {
    router.replace('login')
    localStorage.clear()
    dispatch(deleteUser())
  }
  const dispatch = useDispatch()

  const axiosChangeImage = (e: ChangeEvent) => {
    const formaData = new FormData()
    formaData.append('image', e.target.files[0])
    formaData.append('userId', user.id)
    console.log(formaData)
    uploadUserImage(formaData).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      dispatch(addUser(res.data.user))
      router.refresh()
      setChangeImage(false)
    })

  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='secondary' className='rounded-full w-10 overflow-hidden h-10 cursor-pointer relative'>
            <Image src={user?.image?.url} fill className="object-cover" alt="use-Image" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px]  top-[35%]   -right-[6%] ">
          {changeImage ? <>
            <DialogHeader>

              <div className="mb-5 flex justify-center">
                <div className="relative  w-60 h-60">
                  
                  <Image src={user?.image?.url} fill className="object-cover rounded-sm cursor-pointer mx-auto mb-10 " alt="userImage" />
                  
                </div>
              </div>
              <div className="flex justify-evenly">
                <label className={`${buttonVariants(Button)} cursor-pointer`} htmlFor="file">Select Image </label>

                <Input type="file" className="hidden" id="file" onChange={(e) => axiosChangeImage(e)} />
                <Button variant='secondary' className="cursor-pointer" onClick={() => setChangeImage(false)}>return</Button>
              </div>

            </DialogHeader>
          </> : (<>
            <DialogHeader>
              <div className="relative flex justify-end nly w-20 h-20">
                <Image src={user?.image?.url} fill className="object-cover rounded-full cursor-pointer" alt="userImage" />
                <Button variant='secondary' className="cursor-pointer absolute -bottom-3 -right-3 rounded-full" onClick={() => setChangeImage(true)}><PenIcon /></Button>
              </div>
            </DialogHeader>
            <div className="flex gap-5">
              <Label className="font-bold w-8">name:</Label>
              <p>{user?.username}</p>
            </div>
            <div className="flex gap-5">

              <Label className="font-bold w-8 text-wrap">Email:</Label>
              <p>{user?.email}</p>
            </div>
            <DialogFooter className="flex  justify-between w-full">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={logOut} type="submit">Log Out</Button>
            </DialogFooter>
          </>)}
        </DialogContent>

      </form>
    </Dialog>
  )
}

export default UserDialog