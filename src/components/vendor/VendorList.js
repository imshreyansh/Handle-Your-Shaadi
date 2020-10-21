import React, { Component } from 'react'
import {connect} from 'react-redux'

class VendorList extends Component {
    constructor(props) {
        super(props)
        this.default={

        }
        this.state=this.default

    }

render(){
    return (
        <div>
            <h1>Vendor List</h1>
        </div>
    )
}
}

function mapStateToProps(vendor){
    return{
        vendor
    }
}

export default connect(mapStateToProps)(VendorList)