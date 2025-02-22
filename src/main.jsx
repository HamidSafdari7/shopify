import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { SnackbarProvider } from "notistack";


createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </SnackbarProvider>,
)
