import React, { Component } from 'react';
import './Authentication.css'
import logo from '../../assets/logo.png'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authorization'
class Authentication extends Component {
    state = {
        email: '',
        password: ''
    }

    onSubmit = () => {
        const obj = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(loginUser(obj))
    }
    render() {
        return (
            <div className="authedFirst">
                <div className="authedSecond">
                    <img src={logo} alt="smile" />
                </div>
                <div className="authedThird">
                    <div className="authedFourth">
                        <input type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder='EMAIL' className="authedEmail" />
                        <input type="text" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder='PASSWORD' className="authedPassword" />
                        <div className="authedSubmit" onClick={() => this.onSubmit()}>
                            <div className="authedSubmitTwo">
                                <span className="authedSubmitText">Log In</span>
                                <ArrowForwardIcon style={{ marginTop: 5, color: '#e040fb' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(authed) {
    return {
        user: authed
    }
}

export default connect(mapStateToProps)(Authentication)