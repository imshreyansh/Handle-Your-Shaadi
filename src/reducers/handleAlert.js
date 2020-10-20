import {GET_ALERT} from '../actions/ActionTypes'

export default function handleAlert(state=null,action){
    const {type,payload} = action
    switch(type){
        case GET_ALERT:
            return payload

            default:
                return state
    }
}