import {ADD_TYPE,GET_ALL_TYPES,UPDATE_TYPE} from '../actions/ActionTypes'

export default function addType(state=null,action){
    const {type,payload} = action
    const newPayload = payload === null ? '' : payload
    switch (type) {
        case ADD_TYPE:
            const newArr = [...state.getAllTypes,newPayload].filter(d=> d !=='')
            return{
                ...state,
                ...{addType: payload},
                getAllTypes:newArr
            }

        case GET_ALL_TYPES : 
        return {
            ...state,
            ...{getAllTypes: payload}
        }        

        case UPDATE_TYPE:
            const filterUpdate = state.getAllTypes.filter(d=>d._id !== newPayload._id)
            const updatedArr = [newPayload,...filterUpdate].filter(d=> d !=='')
            return{
                ...state,
                getAllTypes:updatedArr
            }
            
            default:
                return state
    }
}