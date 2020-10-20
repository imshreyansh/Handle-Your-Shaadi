import React, { Component } from 'react';
import './SideMenuDashboard.css'
import whiteLogo from '../../assets/whiteLogo.png'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import user from '../../assets/user.png'
import { withRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import {getItemFromStorage} from '../../utils/localStorage'
import {logoutUser} from '../../actions/authorization'
class TopBar extends Component {

    onSeelect = (e) => {
        if(e==='LOGOUT'){
this.props.dispatch(logoutUser())
            setTimeout(() => {
            this.props.history.push('/')
          }, 1000)
      
        }
        }

    render() {
        return (
            <div className="saDashboardZero">
                  <div className="saDashboardBottomDrawer">
<div className="saDashboardBottomDrawerUser">
    <span className="saUsername">{this.props.user.name}</span>
<img className="saUserImage" src={this.props.user.avatar ? this.props.user.avatar.path : user} alt="Logo" />
<select className ="saDropdown" onChange={(e)=>this.onSeelect(e.target.value)}>
<option defaultValue="HOME">HOME</option>
  <option value="LOGOUT">LOGOUT</option>
</select>
</div>
</div>
            </div>
         
        )
    }
}

function mapStateToProps(authed) {
    return {
        user: jwt.decode(getItemFromStorage('authedToken'))
    }
}

export default (connect(mapStateToProps)(withRouter(TopBar)))