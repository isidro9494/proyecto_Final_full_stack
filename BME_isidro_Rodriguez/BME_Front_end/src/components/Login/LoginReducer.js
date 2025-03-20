import { LOAD_INFO, LOGIN ,LOAD_OUT} from "./LoginAction"


const initialState = {
    login: undefined, 
    isOnline: false
}

const loginReducer = (state = initialState, action) => {
    if(action.type === LOGIN){
        return { 
            ...state,
            login: action.payload,
            isOnline: true
        }
    }else if(action.type === LOAD_INFO) {
        return {
            ...state,
            login: action.payload
        }
    }else if(action.type === LOAD_OUT){
        return {
            ...state,
            login:action.payload,
        }
    }else{ 
        return state;
    }
}

export default loginReducer