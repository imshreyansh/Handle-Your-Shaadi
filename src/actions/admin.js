import {CREATE_ADMIN,GET_ALL_ADMIN,UPDATE_ADMIN} from './ActionTypes'
import axios from 'axios'
import { IP } from '../configurations/config'
import {getAlert} from './handlAlert'

export const createAdmin = (data) => dispatch => {
    axios.post(`${IP}/api/credential/createAdmin`, data)
    .then(res => {
        dispatch(getAlert({
            type:'success',
            error:'Successfully Registered'
        }))
        dispatch({ type: CREATE_ADMIN, payload: res.data.response })
    })
    .catch(err =>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: CREATE_ADMIN, payload: null })
    )
}

export const getAllAdmin = ()=>dispatch=>{
    axios.get(`${IP}/api/credential/getAllAdmin`)
    .then(res=>{
        dispatch({type:GET_ALL_ADMIN, payload: res.data.response})
    })
    .catch(err=>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: GET_ALL_ADMIN, payload: null })
        )
}

export const updateAdmin = (data,id) => dispatch => {
    axios.put(`${IP}/api/credential/updateAdmin/${id}`, data)
    .then(res => {
        dispatch(getAlert({
            type:'success',
            error:'Successfully Updated'
        }))
        dispatch({ type: UPDATE_ADMIN, payload: res.data.response })
    })
    .catch(err =>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: UPDATE_ADMIN, payload: null })
    )
}