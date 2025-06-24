

import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  favorites: [],
  loading: false,
  error: null
}
type initialStateType = {
  favorite: [],
  loading: boolean,
  error: null
}
const userSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.favorites.push(...action.payload)
    },

  }
})

export const { setFavorite} = userSlice.actions
export default userSlice.reducer