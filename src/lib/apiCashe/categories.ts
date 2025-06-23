import axios from "axios"



export const getCategories = async () => await axios.get('/api/categories')
export const updateCategory = async (id: string, name: string) => await axios.put(`/api/categories/${id}`, {
  name
})
export const deleteCategory = async (id: string) => await axios.delete(`/api/categories/${id}`)
export const createCategory = async (name: string) => await axios.post(`/api/categories`,
  {
    name: name
  })