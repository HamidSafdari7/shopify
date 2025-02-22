import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import authReducer from './features/auth/authSlice'
import authApi from './features/auth/authApi'
import productsApi from './features/products/productsApi'
import reviewApi from './features/reviews/reviewsApi'
import statsApi from './features/stats/statsApi'
import orderApi from './features/orders/orderApi'
import blogsApi from './features/blogs/blogsApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [blogsApi.reducerPath]: blogsApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, blogsApi.middleware, reviewApi.middleware, statsApi.middleware, orderApi.middleware)
})