import {CREATE_ADMIN,GET_ALL_ADMIN,UPDATE_ADMIN} from '../actions/ActionTypes'

export default function admin(state=null,action){
    const { type, payload } = action
    const newPayload = payload === null ? '' : payload
    switch (type) {
        case CREATE_ADMIN:
            const newArr = [...state.allAdminList,newPayload].filter(d=> d !=='')
            return {
                ...state,
                ...{createAdmin:payload},
                allAdminList:newArr
            }

        case GET_ALL_ADMIN:
            return{
                ...state,
                ...{allAdminList:payload}
            }

        case UPDATE_ADMIN: 
            const filterUpdate = state.allAdminList.filter(d=>d._id !== newPayload._id)
            const updatedArr = [newPayload,...filterUpdate].filter(d=> d !=='')
        return {
                ...state,
                allAdminList: updatedArr.reverse()
            }
        default:
            return state
    }
}