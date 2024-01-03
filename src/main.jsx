import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './redux/RootReducers.jsx'
import CustomTheme from './Components/CustomTheme.jsx'
import store from './redux/store.jsx'


// const store = configureStore({
//   reducer: rootReducer
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider theme={CustomTheme}>
      <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
