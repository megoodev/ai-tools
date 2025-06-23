import axios from "axios";


export const uploadUserImage = async (formData: FormData ) => axios.put('/api/upload',formData,{
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true
}
)