import React, { useState } from 'react'
import { doLoginAction } from '../components/Login/LoginAction'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, doLoginFetch } from '../core/services/loginFetch'
import HomePage from './HomePage'
import styles from '../assets/styles/LoginPage.module.css'

const LoginPage = () => {
  const { login } = useSelector(state => state.loginReducer)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flagLogin, setFlagLogin] = useState(true) 
  const [registerInfo, setRegisterInfo] = useState({})
  const dispatch = useDispatch()

  const doLogin = async () => {
    const loginInfo = await doLoginFetch(username, password)
    dispatch(doLoginAction(loginInfo))
  }

  const doRegister = async () => {
    const loginInfo = await createUser(registerInfo)
    dispatch(doLoginAction(loginInfo))
  }

  const handlerRegisterInfo = (name, value) => {
    setRegisterInfo({ ...registerInfo, [name]: value })
  }

  return (
    <div className={styles.loginContainer}>
      {!login ? (
        flagLogin ? (
          <div>
            <div className={styles.header}>
              <h1 className={styles.tickerEffect}>BME</h1>
              <h2>Login</h2>
            </div>
            <div>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input type="text" placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <button className={styles.buttonPrimary} onClick={doLogin}>Iniciar sesión</button>
              </div>
            </div>
            <div className={styles.formGroup}>
              <button className={styles.buttonSecondary} onClick={() => setFlagLogin(false)}>Quiero registrarme</button>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.header}>
              <h2>Registro</h2>
            </div>
            <div>
              <div className={styles.formGroup}>
                <label>Nombre</label>
                <input type="text" placeholder="nombre" name="nombre" onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input type="text" placeholder="username" name="username" onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input type="password" placeholder="password" name="password" onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <button className={styles.buttonPrimary} onClick={doRegister}>Registrarme</button>
              </div>
            </div>
            <div className={styles.formGroup}>
              <button className={styles.buttonSecondary} onClick={() => setFlagLogin(true)}>Volver a login</button>
            </div>
          </div>
        )
      ) : (
        <HomePage/>
      )}
    </div>
  )
}

export default LoginPage