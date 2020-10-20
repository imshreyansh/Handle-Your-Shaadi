import {GET_ALL_DESIGNATION} from '../actions/ActionTypes'

export default function getDesignation(state=null,action){
    const {type,payload} = action

    switch(type){
        case GET_ALL_DESIGNATION:
            return {
                ...state,
                payload
            }

            default:
                return state
    }
}