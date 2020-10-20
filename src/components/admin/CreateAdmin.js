import React, { Component } from 'react';
import './Admin.css'
import CreateIcon from '@material-ui/icons/Create';
import user from '../../assets/user.png'
import PhoneInput from 'react-phone-number-input'
import { connect } from 'react-redux'
import {createAdmin,getAllAdmin,updateAdmin} from '../../actions/admin'
import {validation,pagination} from '../../utils/validation'
import {getDesignation} from '../../actions/designations'
import Pagination from '@material-ui/lab/Pagination';

class CreateAdmin extends Component {
    constructor(props) {
        super(props)
        this.default = {
            name:'',
            nameE:'',
            email:'',
            emailE:'',
            mobile:'',
            mobileE:'',
            password:'',
            passwordE:'',
            gender:'MALE',
            file:'',
            imagePreviewUrl:'',
            editedDataId:'',
            pageNumber:1,
        }

        this.state = this.default
        this._handleImageChange = this._handleImageChange.bind(this);
        this.props.dispatch(getDesignation())
        this.props.dispatch(getAllAdmin())
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onSubmit = () => {
        const {name,nameE, mobile,mobileE,password,passwordE,email,emailE} = this.state
            const obj = {
                name:this.state.name,
                email:this.state.email,
                mobile: this.state.mobile,
                password: this.state.password,
                gender: this.state.gender,
designation: this.props.designations.payload.filter(d=>d.designation==='Admin')[0]._id,
            }
            const objTwo = {
                name:this.state.name,
                email:this.state.email,
                mobile: this.state.mobile,
                password: this.state.password,
                gender: this.state.gender,
            }
            if(name !== '' && nameE ==='' && mobile !== '' && mobileE ==='' && password !== '' && passwordE ===''&& email !== '' && emailE ===''){
                const formData = new FormData()
                formData.append('data',JSON.stringify(obj))
                formData.append('avatar',this.state.file)
                const formDataTwo = new FormData()
                formDataTwo.append('data',JSON.stringify(objTwo))
                formDataTwo.append('avatar',this.state.file)
        this.state.editedDataId !=='' ? this.props.dispatch(updateAdmin(formDataTwo, this.state.editedDataId))  : this.props.dispatch(createAdmin(formData))
        this.setState({
            name:'',
            email:'',
            mobile:'',
            password:'',
            gender:'MALE',
            editedDataId:'',
            imagePreviewUrl:'',
            file:''
        })
            }
            if(name === ''){
                this.setState({
                    nameE:'This field is required'
                })
            }
                if(mobile === ''){
                    this.setState({
                        mobileE:'This field is required'
                    })
                }
            if(password === ''){
                this.setState({
                    passwordE:'This field is required'
                })
            }
            if(email === ''){
                this.setState({
                    emailE:'This field is required'
                })
            }
        
     
    }

    onEdit = (data) => {
        if(data){
            this.setState({
                name:data.name,
                email:data.email,
                mobile:`+${JSON.stringify(data.mobile)}`,
                gender:data.gender,
                imagePreviewUrl:data.avatar.path,
                editedDataId:data._id,
                gender:data.gender
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
        const formDataTwo = new FormData()
        formDataTwo.append('data',JSON.stringify(obj))
        formDataTwo.append('avatar',this.state.file)
        this.props.dispatch(updateAdmin(formDataTwo, this.state.editedDataId))
        this.setState({
            editedDataId:''
        })
    })
    } 
    render() {
        return (
         <div className="adminOne">
             
             <div className="adminTwo">
             <CreateIcon className="adminEdit" style={{fontSize:25}}/>
             <label for="file-input">
             <div className="adminImageUpload">
             <input id="file-input" type="file" onChange={this._handleImageChange} />
             <img className="adminUserImage" src={this.state.imagePreviewUrl !== '' ? this.state.imagePreviewUrl : user} alt="Logo" />
            </div>
             </label>
             </div>
         <div className="adminThree">
<input type="text" className="adminTextInputOne" style={{borderColor: this.state.nameE !=='' ? 'red' :'#ad1457'}} value={this.state.name} onChange={(e)=>this.setState(validation(e,'name','text',['Name is reuired']))} placeholder="NAME"/>
<input type="email" className="adminTextInputTwo" style={{borderColor: this.state.emailE !=='' ? 'red' :'#ad1457'}} value={this.state.email} onChange={(e)=>this.setState(validation(e,'email','email',['Email is reuired','Incorrect Email']))} placeholder="Email"/>
<PhoneInput
style={{borderColor: this.state.mobileE !=='' ? 'red' :'#ad1457'}}
      placeholder="MOBILE"
      value={this.state.mobile}
      onChange={(e)=>this.setState(validation(e,'mobile','mobile',['This field is required']))}/> 
      </div>
         <div className="adminFour">
  {this.state.gender==='MALE' ? 
<select className ="adminTextInputFive"  onChange={(e)=>this.setState({gender:e.target.value})}>
  <option value="MALE">MALE</option>
  <option value="FEMALE">FEMALE</option>
  </select>
  :
  <select className ="adminTextInputFive"  onChange={(e)=>this.setState({gender:e.target.value})}>
  <option value="FEMALE">FEMALE</option>
  <option value="MALE">MALE</option>
  </select>
}
<input type="password" className="adminTextInputFour" style={{borderColor: this.state.passwordE !=='' ? 'red' :'#ad1457'}} value={this.state.password} onChange={(e)=>this.setState(validation(e,'password','text',['This field is required']))} placeholder="PASSWORD"/>
         </div>
         <div className="adminCreateAdminButtonFirst" onClick={()=>this.onSubmit(false)}>  
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
            {this.props.listOfAdmin !== null && pagination(this.state.pageNumber,this.props.listOfAdmin,2).map((d,i)=>{
                if(d!==undefined){
                    const index = this.props.listOfAdmin.indexOf(d)
                        return(
                        <div className="listAdminTwo">
                        <div className="listAdminThree">
                            <span className="spanNameTwo">{index+1}.</span>
                            <img className="adminListUserImage" src={d.avatar.path} />
                    <span className="spanName">{d.name}</span>
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
         count={this.props.listOfAdmin !==null ? Math.ceil(this.props.listOfAdmin.length/2) : 2}
         variant="outlined"
         onChange={(e,pn)=>this.setState({pageNumber:pn},()=>pagination(this.state.pageNumber,this.props.listOfAdmin,2))}
         shape="rounded"
         className="paginationListAdmin"/>
         </div>
        )
    }
}

function mapStateToProps(authed) {
    return {
        designations: authed.designations,
        listOfAdmin:authed.admin !==null && authed.admin.allAdminList !==null ? authed.admin.allAdminList : [],
    }
}

export default connect(mapStateToProps)(CreateAdmin)