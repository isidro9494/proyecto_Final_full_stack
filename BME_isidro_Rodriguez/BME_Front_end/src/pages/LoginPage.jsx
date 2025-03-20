import React, { useState } from 'react'
import { doLoginAction } from '../components/Login/LoginAction'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, doLoginFetch } from '../core/services/loginFetch'
import HomePage from './HomePage'

const LoginPage = () => {
  const {
    login
  } = useSelector(state => state.loginReducer)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flagLogin, setFlagLogin] = useState(true) 
  const [registerInfo, setRegisterInfo] = useState({})
  const dispatch = useDispatch()

  const doLogin = async () => {
    const loginInfo = await doLoginFetch(username, password)
    console.log('loginInfo',loginInfo);
   
    dispatch(
      doLoginAction(loginInfo)
    )
  }

  const doRegister = async () => {
   
    const loginInfo = await createUser(registerInfo)
    console.log('userInfo',loginInfo)
  
    dispatch(
      doLoginAction(loginInfo)
    )
  }

  const handlerRegisterInfo = (name, value) =>{
    setRegisterInfo({
      ...registerInfo,
      [name]: value
    })
  }


  return (
    <div>
    {
      !login ? (
        flagLogin 
          ? (
            <div>
              <h1>BME</h1>
              <h2>Login</h2>
              <div>
                  <div>
                      <span>Username</span>
                      <input type="text" placeholder='username' name='username' onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                  <div>
                      <span>Password</span>
                      <input type="password" placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div>
                      <button onClick={doLogin}>Iniciar sesión</button>
                  </div>
              </div>
              <div>
                  <button onClick={() => setFlagLogin(false)}>Quiero registrarme</button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Registro</h2>
              <div>
                  <div>
                      <span>Nombre</span>
                      <input type="text" placeholder='nombre' name='nombre' onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)}/>
                  </div>
                  <div>
                      <span>Username</span>
                      <input type="text" placeholder='username' name='username' onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)} />
                  </div>
                  <div>
                      <span>Password</span>
                      <input type="text" placeholder='password' name='password' onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)}/>
                  </div>
                  <div>
                      <button onClick={doRegister}>Registrarme</button>
                  </div>
              </div>
              <div>
                  <button onClick={() => setFlagLogin(true)}>Volver a login</button>
              </div>
            </div>
          )
      ) : (
        <HomePage/>
      )
    }
  </div>
)
}

export default LoginPage