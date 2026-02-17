import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>