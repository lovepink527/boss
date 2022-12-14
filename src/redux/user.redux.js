import axios from "axios"
import { getRedirectPath } from "./util" 

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState={
    redirectTo:'',
    isAuth: '',
    msg:'',
    user: '',
    type:''
}

//reducer
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOGIN_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case AUTH_SUCCESS:
            return{...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return{...state,isAuth:false,msg: action.msg}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}

function errorMsg(msg){
    return {msg,type: ERROR_MSG}
}

function registerSuccess(data){
    return {payload:data ,type: REGISTER_SUCCESS}
}
function loginSuccess(data){
    return {type: LOGIN_SUCCESS,payload:data}
}
function authSuccess(data){
    return {payload:data ,type: AUTH_SUCCESS}
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if (res.status===200&&res.data.code===0) {
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function logoutSubmit(){
    return {type:LOGOUT}
}

export function loadData(userinfo){
	return { type:LOAD_DATA, payload:userinfo}
}

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('???????????????????????????')
    }
    return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
        		
	}
    }

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('?????????????????????')
    }
    if(pwd !== repeatpwd){
        return errorMsg('??????????????????????????????')
    }
    return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(registerSuccess({user,pwd,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
        		
	}
}