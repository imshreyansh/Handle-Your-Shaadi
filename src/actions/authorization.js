import { LOGIN_USER,LOGOUT_USER } from './ActionTypes'
import axios from 'axios'
import { IP } from '../configurations/config'
import {removeItemFromStorage} from '../utils/localStorage'
import {getAlert} from './handlAlert'

export const loginUser = (data) => dispatch => {
    axios.post(`${IP}/api/credential/login`, data)
        .then(res => {
            dispatch({ type: LOGIN_USER, payload: res.data.response })
        })
        .catch(err =>
            dispatch(getAlert({
                type:'error',
                error:err.message
            })),
            dispatch({ type: LOGIN_USER, payload: null })
        )
}

export const logoutUser = ()=>dispatch=>{
    removeItemFromStorage('authedToken')
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    })

}