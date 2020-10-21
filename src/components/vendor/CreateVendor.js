import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CreateVendor.css'
import {validation} from '../../utils/validation'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import user from '../../assets/user.png'
import {getAllTypes} from '../../actions/types'
import {getDesignation} from '../../actions/designations'
import {createVendor} from '../../actions/vendor'
import PhoneInput from 'react-phone-number-input'
import cities from '../../utils/cities.json'
class CreateVendor extends Component {
    constructor(props) {
        super(props)
        this.default={
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
            storeName:'',
            storeNameE:'',
            storeMobile:'',
            storeMobileE:'',
            storeCity:'',
            address:'',
            addressE:'',
            type:'',
            storeDocuments:'',
            storeDocumentsE:'',
            store:[],
            storeDocs:[]

        }
        this.state=this.default
        this._handleImageChange = this._handleImageChange.bind(this);
        this.documentsSelect = this.documentsSelect.bind(this);
        this.props.dispatch(getAllTypes())
        this.props.dispatch(getDesignation())

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

    documentsSelect(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                storeDocuments: file,
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
                designation: this.props.designations.payload.filter(d=>d.designation==='Vendor')[0]._id,
            }
            const formData = new FormData()
            formData.append('data',JSON.stringify(obj))
            formData.append('avatar',this.state.file)
            this.state.store.map((d)=>{
                const obj = {
                    storeName:d.storeName,
                    address:d.address,
                    storeMobile:d.storeMobile,
                    typeOfStore:d.typeOfStore
                }
                formData.append('storeDocument',d.storeDocument)
                formData.append('store',JSON.stringify(obj))
            })
            if(name !== '' && nameE ==='' && mobile !== '' && mobileE ==='' && password !== '' && passwordE ===''&& email !== '' && emailE ===''){
this.props.dispatch(createVendor(formData))
        // this.setState({
        //     name:'',
        //     email:'',
        //     mobile:'',
        //     password:'',
        //     gender:'MALE',
        //     editedDataId:'',
        //     imagePreviewUrl:'',
        //     file:''
        // })
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
    onAdd = () =>{
        const {storeName,storeNameE,storeMobile,storeMobileE,storeDocuments,storeCity,address,type} = this.state
        if(storeName !== '' && storeNameE === '' && storeMobile !== '' && storeMobileE === '' && storeDocuments !==''){
            const objTwo = {
                storeName:storeName,
                storePhotos:'',
                storeDocument:this.state.storeDocuments,
                address:{
                    state:storeCity ? cities[storeCity].state : 'Maharashtra',
                    address:address,
                    city:storeCity ? cities[storeCity].name : 'Mumbai',
                },
                storeMobile:storeMobile,
                typeOfStore:type ? type : this.props.types[0]._id
            }
            this.setState({
                store:[...this.state.store,objTwo],
            })
        }
        if(storeName === ''){
            this.setState({
                storeNameE:'This field is required'
            })
        }
        if(storeMobile ===''){
            this.setState({
                storeMobileE:'This field is required'
            })
        }
        if(storeDocuments === ''){
            this.setState({
                storeDocumentsE:'This field is required'
            })
        }
        if(address === ''){
            this.setState({
                addressE:'This field is required'
            })
        }
    }
render(){
    return (
        <div className="adminOne">
             
        <div className="adminTwo">
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
    <div className="adminFour">
    <input type="text" className="adminTextInputFour" style={{borderColor: this.state.storeNameE !=='' ? 'red' :'#ad1457'}} value={this.state.storeName} onChange={(e)=>this.setState(validation(e,'storeName','text',['This field is required']))} placeholder="STORE NAME"/>
    <PhoneInput
style={{borderColor: this.state.storeMobileE !=='' ? 'red' :'#ad1457'}}
 placeholder="STORE MOBILE"
 value={this.state.storeMobile}
 onChange={(e)=>this.setState(validation(e,'storeMobile','mobile',['This field is required']))}/> 
 <select className ="adminTextInputFive"  onChange={(e)=>this.setState({storeCity:e.target.value})}>
     {cities.map((d,i)=>{
         return(
<option key={i} value={d.id}>{d.name}</option>
         )
     })}
</select>
</div>
<div className="adminFour">
 <select className ="adminTextInputFive"  onChange={(e)=>this.setState({type:e.target.value})}>
     {this.props.types && this.props.types.map((d,i)=>{
         return(
<option key={i} value={d._id}>{(d.type)}</option>

         )
     })}
</select>
<input type="text" className="adminTextInputOne" style={{borderColor: this.state.addressE !=='' ? 'red' :'#ad1457'}} value={this.state.address} onChange={(e)=>this.setState(validation(e,'address','text',['Address is reuired']))} placeholder="ADDRESS"/>
<label for="documents-input" className="vendorTextInputTwo" style={{borderColor: this.state.storeDocumentsE !=='' ? 'red' :'#ad1457',backgroundColor:'white'}}>
<input id="documents-input" type="file" onChange={this.documentsSelect} />
<span style={{fontSize:14,color:this.state.storeDocuments ? '#333' : 'grey'}}>{this.state.storeDocuments ? this.state.storeDocuments.name : 'UPLOAD DOCS'}</span>
</label>
</div>
<div className="vendorButtons">
<div className="adminCreateAdminButtonFirst" onClick={()=>this.onAdd()}>  
    <div className="adminCreateAdminButton">
    <span className="adminSubmitText">ADD</span>
    </div>
    </div>
    <div className="adminCreateAdminButtonFirst" onClick={()=>this.onSubmit()}>  
    <div className="adminCreateAdminButton">
    <span className="adminSubmitText">SUBMIT</span>
    </div>
    </div>
</div>
<div className="vendorDataAdded">
    {this.state.store.map((d,i)=>{
        const typeName = this.props.types.filter(data=>data._id === d.typeOfStore)
        return(
<div className="vendorDataDisplay">
    <DeleteIcon style={{color:"#ad1457"}}/>
    <div className="vendorData">
    <span className="vendorDataSpan">{d.storeName}</span>
<span className="vendorDataSpan">{d.storeMobile}</span>
<span className="vendorDataSpan">{d.address.city}</span>
<span className="vendorDataSpan">{d.address.state}</span>
<span className="vendorDataSpan">{typeName[0].type}</span>
        <span className="vendorDataSpan">{d.address.address}</span>
        <span className="vendorDataSpan">{d.storeDocument.name}</span>
    </div>
</div>
        )
    })}
</div>
        </div>
    )
}
}

function mapStateToProps(vendor){
    return{
        vendor,
        designations: vendor.designations,
        types:vendor.types !== null && vendor.types.getAllTypes !==null ? vendor.types.getAllTypes : []
    }
}

export default connect(mapStateToProps)(CreateVendor)