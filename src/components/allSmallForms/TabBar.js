import React,{ Component} from 'react'
import './Types.css'
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import CategoryIcon from '@material-ui/icons/Category';
import Types from './Types'
class TabBar extends Component{
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
            <Tab icon={<CategoryIcon style={{fontSize:25,color: '#ad1457'}} />} label="Categories" value="1"/>
          </TabList>
        <TabPanel value="1"><Types/></TabPanel>
      </TabContext>
            </div>
        )
    }
}


export default TabBar