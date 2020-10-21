import React,{ Component} from 'react'
import '../allSmallForms/Types.css'
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ListIcon from '@material-ui/icons/List';
import CreateVendor from './CreateVendor'
import VendorList from './VendorList'

class VendorTab extends Component{
    constructor(props){
        super(props)
        this.default={
            value:1
        }
        this.state = this.default
    }

    handleChange =(v) => {
        console.log(v)
        this.setState({
            value:v
        })
    }
    render(){
        return(
            <div className='tabBarZero'>
                <TabContext value={(this.state.value).toString()}>
          <TabList onChange={(e,v)=>this.handleChange(v)} aria-label="simple tabs example">
            <Tab icon={<LocalMallIcon style={{fontSize:25,color: '#ad1457'}} />} label="Create Vendor" value="1"/>
            <Tab icon={<ListIcon style={{fontSize:25,color: '#ad1457'}} />} label="Vendor List" value="2"/>
          </TabList>
        <TabPanel value="1"><CreateVendor/></TabPanel>
        <TabPanel value="2"><VendorList/></TabPanel>
      </TabContext>
                </div>
        )
    }
}


export default VendorTab