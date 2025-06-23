import axios from "axios"

export const getfavorites = async () => await axios.get('/api/favorites')
export const addFavorites = async (id: string) => await axios.put(`/api/favorites/${id}`)
export const deleteFavorites = async (id: string) => await axios.delete(`/api/favorites/${id}`)