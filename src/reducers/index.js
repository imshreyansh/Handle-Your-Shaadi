import { combineReducers } from 'redux'
import loginUser from './authorization'
import admin from './admin'
import handleAlert from './handleAlert'
import designations from './designations'
import types from './types'
export default combineReducers({
    loginUser,
    admin,
    handleAlert,
    designations,
    types
})