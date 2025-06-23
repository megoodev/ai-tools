
import { createSlice } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  user: [],
  loading: false,
  error: null
} 
type initialStateType = {
  user: [],
  loading: boolean,
  error: null
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload)
    },
    deleteUser: (state)=> {
      state.user = []
    }
  }
})

export const {addUser,deleteUser} = userSlice.actions
export default userSlice.reducer