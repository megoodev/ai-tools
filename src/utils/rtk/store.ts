import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import favoriteReduser from './FavoriteSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoriteReduser
  }
})

// تصدير الأنواع المهمة
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch