import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import {connect} from 'react-redux'

class SnackBar extends Component {
state={
    setOpen:false
}

    componentWillReceiveProps({error}){
        if(error && error.handleAlert !== null){
            this.setState({
                setOpen:true
            })
        }else{
            this.setState({
                setOpen:false
            })
        }
    }

     handleClose = () => {
    this.setState({
        setOpen:false
    })
    }

    render(){
        return(
            <Snackbar open={this.state.setOpen} autoHideDuration={6000} onClose={()=>this.handleClose()}>
            <MuiAlert elevation={6} variant="filled" onClose={()=>this.handleClose()} severity={this.props.errorType}>
                {this.props.errorText}
              </MuiAlert>
            </Snackbar>
        )
    }
}

function mapStateToProps(error){
    return{
        error,
        errorText:error.handleAlert !== null ? error.handleAlert.error : '',
        errorType:error.handleAlert !== null ? error.handleAlert.type : 'success'
    }
}

export default connect(mapStateToProps)(SnackBar)