import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { upgradeUser } from "@/lib/apiCashe/users"


const IsAdmin = ({ isAdmin, id ,setAdmin}: { isAdmin: boolean, id: string, setAdmin: boolean }) => {

  const tooglePermssiom = (e: string) => {
    if (e == 'admin') {
      upgradeUser(id, true).then(() => setAdmin(true) ).catch((error) => {
        console.error(error)        
      })
      

    } else {
      upgradeUser(id, false).then(() => setAdmin(false)).catch((error) => {
        console.error(error)
      })
      setAdmin(false)

    }
    
  }
  return (
    <Select onValueChange={(e) => tooglePermssiom(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={isAdmin ? 'admin' : 'normal'} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="admin">admin</SelectItem>
        <SelectItem value="normal">normal</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default IsAdmin