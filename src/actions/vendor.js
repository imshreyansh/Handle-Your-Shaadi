import {CREATE_VENDOR} from './ActionTypes'
import axios from 'axios'
import { IP } from '../configurations/config'
import {getAlert} from './handlAlert'

export const createVendor= data => dispatch => {
    axios.post(`${IP}/api/vendor/createVendor`,data)
    .then(res=>{
        dispatch(getAlert({
            type:'success',
            error:'Successfully Added'
        }))
        dispatch({ type:CREATE_VENDOR, payload: res.data.response})
    })
    .catch(err =>
        dispatch(getAlert({
            type:'error',
            error:err.message
        })),
        dispatch({ type: CREATE_VENDOR, payload: null })
    )
}