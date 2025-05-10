export const LOGIN = 'LOGIN'
export const LOAD_INFO = 'LOAD_INFO'
export const LOAD_OUT ="LOAD_OUT"

export const doLoginAction = (payload) => {
    return {
        type: LOGIN,
        payload
    }
}

export const loadInfoActions = (payload) => {
    return {
        type: LOAD_INFO,
        payload
    }
}

export const doLogOutAction = (payload) => {
    return {
        type: LOAD_OUT,
        payload
    }
}