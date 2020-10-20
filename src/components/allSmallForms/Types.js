import React,{ Component} from 'react'
import './Types.css'
import {connect} from 'react-redux'
import {validation,pagination} from '../../utils/validation'
import {addType,getAllTypes,updateType} from '../../actions/types'
import CreateIcon from '@material-ui/icons/Create';
import Pagination from '@material-ui/lab/Pagination';
class Types extends Component{
    constructor(props){
        super(props)
        this.default = {
            category:'',
            categoryE:'',
            pageNumber:1,
            editedDataId:''
        }
        this.state=this.default
        this.props.dispatch(getAllTypes())
    }

    onSubmit = () => {
        const {category,categoryE} = this.state
        if(category !=='' && categoryE ===''){
            const obj={
                type:category
            }
           this.state.editedDataId !== '' ? this.props.dispatch(updateType(obj,this.state.editedDataId)) : this.props.dispatch(addType(obj))
            this.setState({
                category:'',
                categoryE:''
            })
        }
        if(this.state.category===''){
            this.setState({
                categoryE:'This files is required'
            })
        }
    }

    onEdit =(data) => {
        if(data){
            this.setState({
                editedDataId:data._id,
                category:data.type
            })
        }
    }

    onStatusDisable= (d)=>{
        this.setState({
            editedDataId:d._id,
    
        },()=>{
            const obj = {
                status: d.status === 'Active' ? 'Inactive' : 'Active'
            }
        this.props.dispatch(updateType(obj, this.state.editedDataId))
            this.setState({
                editedDataId:''
            })
        })
        } 

    render(){
        return(
            <div className='typesZero'>
<div className="typesInputOne">
<input type="text" style={{borderColor: this.state.categoryE !=='' ? 'red' :'#ad1457'}} value={this.state.category} onChange={(e)=>this.setState(validation(e,'category','text',['This field is required']))}className='typesInputOneOne' placeholder="CATEGORY" />
</div>
<div className="adminCreateAdminButtonFirst" onClick={()=>this.onSubmit()}>  
         <div className="adminCreateAdminButton">
         <span className="adminSubmitText">SUBMIT</span>
         </div>
         </div>
         <div className="listAdminOne">
            <div className="listAdminTwo">
                <div className="listAdminThree">
                <span className="spanName">S.no</span>
                <span className="spanName">Name</span>
                </div>
                <div className="listAdminFour">
                <span className="spanName">Status</span>
                </div>
            </div>
            {pagination(this.state.pageNumber,this.props.types,2).map((d,i)=>{
                if(d!==undefined){
                    const index = this.props.types.indexOf(d)
             return(
                <div className="listAdminTwo">
                <div className="listAdminThree">
                    <span className="spanNameTwo">{index+1}.</span>
            <span className="spanName">{d.type}</span>
                    </div>
                    <div className="listAdminFour">
    <div className="statusPointerEnabled" onClick ={()=>this.onStatusDisable(d)}>
                <div className="statusPointerEnabledLength" style={{justifyContent:d.status === 'Active' ? "flex-end": "flex-start"}}>
    <div className="statusPointerEnabledCircle" style={{backgroundColor:d.status === 'Active' ?'#ad1457' : 'grey'}}/>
                    </div>
        </div>
        <CreateIcon style={{fontSize:25, color:'#ad1457',marginLeft:10}} onClick={()=>this.onEdit(d)}/>
    
                    </div>
                </div>
             )
                }
         })}
            </div>
            <Pagination
         count={this.props.types !==null ? Math.ceil(this.props.types.length/2) : 2}
         variant="outlined"
         onChange={(e,pn)=>this.setState({pageNumber:pn},()=>pagination(this.state.pageNumber,this.props.types,2))}
         shape="rounded"
         className="paginationListAdmin"/>
            </div>

        )
    }
}

function mapStateToProps(types){
    return{
        types:types.types !== null && types.types.getAllTypes !==null ? types.types.getAllTypes : []
    }
}
export default connect(mapStateToProps)(Types)