import { LOGIN_USER ,LOGOUT_USER} from '../actions/ActionTypes'

export default function loginUser(state = null, action) {
    const { type, payload } = action
    switch (type) {
        case LOGIN_USER:
            return payload
        
        case LOGOUT_USER:
            return payload
            
        default:
            return state
    }

}