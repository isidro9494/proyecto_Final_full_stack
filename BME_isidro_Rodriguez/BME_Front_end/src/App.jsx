import { useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import LoginPage from './pages/LoginPage'
import store from './core/redux/store/store'

function App() {


  return (
   <Provider store={store}>
    <LoginPage/>
   </Provider>
  )
}

export default App
