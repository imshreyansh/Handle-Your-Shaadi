import React, { Component,Fragment } from 'react';
import './SideMenuDashboard.css'
import whiteLogo from '../../assets/whiteLogo.png'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import StorefrontIcon from '@material-ui/icons/Storefront';
import BusinessIcon from '@material-ui/icons/Business';
import jwt from 'jsonwebtoken'
import {getItemFromStorage} from '../../utils/localStorage'
import user from '../../assets/user.png'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
class SideMenuDashboard extends Component {
    state = {
       
    }

    loggedInUser = () => {
        try{
          const role = jwt.decode(this.props.authedUser).designation
          return role
        }catch{
          return false
        }
      }

    render() {
        return (
            <div className="saDashboardZero">

<div className="saDashboardOneWhole">
             <div className="saDashboardTwoSideMenu">
             <div className="saDashboardThirdLogo">
                    <img  src={whiteLogo} alt="smile" className="saDashboardLogo"/>
                </div>
                {this.loggedInUser() && this.loggedInUser().designation === 'System Admin' ?
                <NavLink to="/createAdmin">
                <div className="saDashboardFourth">
                <SupervisorAccountIcon style={{ marginTop: 10, color: 'white',fontSize:50,cursor:"pointer"}}/>
                </div>
                </NavLink> :
                <Fragment>
             <NavLink to="/vendor">
                <div className="saDashboardFourth">
                <StorefrontIcon style={{ marginTop: 10, color: 'white',fontSize:50,cursor:"pointer"}}/>
                </div>
                </NavLink>
                <NavLink to="/tabBar">
                <div className="saDashboardFourth">
                <BusinessIcon style={{ marginTop: 10, color: 'white',fontSize:50,cursor:"pointer"}}/>
                </div>
                </NavLink>
                </Fragment>
            }
                

             </div>
         </div>
            </div>
         
        )
    }
}

function mapStateToProps(authed) {
    return {
        authedUser:getItemFromStorage('authedToken')
    }
}

export default connect(mapStateToProps)(SideMenuDashboard)