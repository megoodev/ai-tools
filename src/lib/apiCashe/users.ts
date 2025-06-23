import axios from "axios"


export const getUsers = async () => await axios.get('/api/users')
export const deleteUser = async (id: string) => await axios.delete(`/api/users/${id}`)
export const upgradeUser = async (id: string, isAdmin: boolean) => await axios.put(`/api/users/${id}`, {
  admin: isAdmin
})
