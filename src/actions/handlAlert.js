import {GET_ALERT} from './ActionTypes'

export const getAlert = (data) =>dispatch=>{
    dispatch({
        type:GET_ALERT,
        payload:data
    })

    setTimeout(()=>{
        dispatch({
            type:GET_ALERT,
            payload:null
        })
    },2000)
}