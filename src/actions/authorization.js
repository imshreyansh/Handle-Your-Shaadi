import { LOGIN_USER } from './ActionTypes'
import axios from 'axios'
import { IP } from '../configurations/config'

export const loginUser = (data) => dispatch => {
    axios.post(`${IP}/api/credential/login`, data)
        .then(res => {
            dispatch({ type: LOGIN_USER, payload: res.data.response })
        })
        .catch(err =>
            dispatch({ type: LOGIN_USER, payload: null })
        )
}