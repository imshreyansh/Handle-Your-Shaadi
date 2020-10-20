import React, { Component } from 'react';
import './SideMenuDashboard.css'
import { connect } from 'react-redux'
class SystemAdminDashboard extends Component {
    state = {
       
    }
  
    render() {
        return (
         <div className="sadminOne">
           <span>SYSTEM ADMIN DASH</span>
         </div>
        )
    }
}

function mapStateToProps(authed) {
    return {
        user: authed
    }
}

export default connect(mapStateToProps)(SystemAdminDashboard)