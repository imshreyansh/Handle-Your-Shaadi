import React, { Component,Fragment } from 'react';
import './App.css'
import {connect} from 'react-redux'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {getItemFromStorage} from './utils/localStorage'
import SideMenuDashboard from './components/dashboard/SideMenuDashboard'
import Authentication from './components/authentication/Authentication'
import CreateAdmin from './components/admin/CreateAdmin'
import SnackBar from './components/systemUI/SnackBar'
import TopBar from './components/dashboard/TopBar'
import TabBar from './components/allSmallForms/TabBar'
import VendroTab from './components/vendor/VendorTab'
import CreateVendor from './components/vendor/CreateVendor'
class App extends Component {
  constructor(props){
    super(props)
    this.default = {

    }

    this.state = this.default
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
      <Router>
        <SnackBar/>
        {!this.loggedInUser() ?
        <Switch>
          <Route exact path="/" component={Authentication} />
        </Switch> :
        this.loggedInUser() && this.loggedInUser().designation === 'System Admin' ?
        <Fragment>
          <TopBar/>
          <div className="appSideMenuandComponent">
          <SideMenuDashboard />
        <Switch>
        <Route path="/createAdmin" component={CreateAdmin} />
        </Switch>
          </div>
        </Fragment>
        : this.loggedInUser() && this.loggedInUser().designation === 'Admin' ?
        <Fragment>
          <TopBar/>
          <div className="appSideMenuandComponent">
          <SideMenuDashboard />
        <Switch>
        <Route path="/vendor" component={VendroTab} />
        <Route path="/tabBar" component={TabBar} />
        </Switch>
          </div>
        </Fragment> :
        <Switch>
        <Route exact path="/" component={Authentication} />
      </Switch>
  }
      </Router>
    
    )
  }
}
function mapStateToProps(user){
  return{
    authedUser:getItemFromStorage('authedToken')
  }
}
export default connect(mapStateToProps)(App);
