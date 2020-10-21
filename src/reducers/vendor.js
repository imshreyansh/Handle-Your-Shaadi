import {CREATE_VENDOR} from '../actions/ActionTypes'

export default function createVendor(state=null,action){
    const { type, payload } = action
    switch (type) {
        case CREATE_VENDOR:
            return {
                ...state,
                ...{createVendor:payload},
            }

        default:
            return state
    }
}