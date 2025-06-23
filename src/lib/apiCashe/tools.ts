import axios from "axios";

export const getTools = async () => await axios.get('/api/tools')
export const createTool = async (formData: FormData) => await axios.post('/api/tools', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }, withCredentials: true
}
)
export const reomveTool = async (id: string) => await axios.delete(`/api/tools/${id}`)