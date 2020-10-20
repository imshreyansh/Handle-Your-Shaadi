import {GET_ALL_DESIGNATION} from './ActionTypes'
import axios from 'axios'
import { IP } from '../configurations/config'
import {getAlert} from './handlAlert'


export const getDesignation = ()=>dispatch => {
    axios.get(`${IP}/api/designation/getAllDesignation`)
    .then(res=>{
        dispatch({type:GET_ALL_DESIGNATION, payload: res.data.response})
    })
    .catch(err=>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({type:GET_ALL_DESIGNATION, payload: null})
    )
}