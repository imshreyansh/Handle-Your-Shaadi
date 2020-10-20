import {ADD_TYPE,GET_ALL_TYPES,UPDATE_TYPE} from './ActionTypes'
import axios from 'axios'
import { IP } from '../configurations/config'
import {getAlert} from './handlAlert'

export const addType = data => dispatch=>{
    axios.post(`${IP}/api/types/addType`,data)
    .then(res=>{
        dispatch(getAlert({
            type:'success',
            error:'Successfully Added'
        }))
        dispatch({ type: ADD_TYPE, payload: res.data.response })
    })
    .catch(err =>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: ADD_TYPE, payload: null })
    )
}

export const getAllTypes = () => dispatch=>{
    axios.get(`${IP}/api/types/getAllTypes`)
    .then(res=>{
        dispatch({type:GET_ALL_TYPES, payload: res.data.response})
    })
    .catch(err=>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: GET_ALL_TYPES, payload: null })
        )
}

export const updateType = (data,id)=> dispatch => {
    axios.put(`${IP}/api/types/updateType/${id}`,data)
    .then(res=>{
        dispatch(getAlert({
            type:'success',
            error:'Successfully Updated'
        }))
        dispatch({ type: UPDATE_TYPE, payload: res.data.response })
    })
    .catch(err =>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: UPDATE_TYPE, payload: null })
    )
}