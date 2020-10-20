const { CredentitalSchema } = require('../model/credential')
const { handler: { errorResponseHandler, successResponseHandler }, upload: { uploadAvatar } } = require('../config')
const bcrypt = require('bcrypt')

exports.createAdmin = (req, res) => {
    uploadAvatar(req, res, async (error, data) => {
        if (error)
            return errorResponseHandler(res, error, 'Error While Creating')
        try {
            const check = await CredentitalSchema.findOne({ email: JSON.parse(req.body.data).email })
            if (check) return errorResponseHandler(res, 'Error', 'User Already Exist')
            const { name, email, mobile, password, gender, designation } = JSON.parse(req.body.data)
            const salt = await bcrypt.genSalt(12)
            const addAdmin = new CredentitalSchema({ name, email, mobile, password, gender, designation })
            addAdmin.password = await bcrypt.hash(addAdmin.password, salt)
            addAdmin['avatar'] = req.files[0]
            const response = await addAdmin.save()
            successResponseHandler(res, response, 'Succesfully Registered Admin')
        }
        catch (error) {
            errorResponseHandler(res, error, 'Error While Adding Admin')
        }
    })

}

exports.getAllAdmin = async(req,res)=>{
    CredentitalSchema.find({}).populate('designation')
    .then((response)=>{
        const newResponse = response.filter(d=>d.designation.designation === 'Admin')
        successResponseHandler(res, newResponse, 'Successfully got all admin')
    })
    .catch((error)=>{
        errorResponseHandler(res, error, 'Error while getting all admin')
    })
}

exports.updateAdmin = async(req,res)=>{
    uploadAvatar(req,res,async(error,data)=>{
        if (error)
        return errorResponseHandler(res, error, 'Error While Creating')
        try{
            const { status} = JSON.parse(req.body.data)
            if(status !==undefined){
                const addAdmin = await CredentitalSchema.findOneAndUpdate({_id:req.params.id},{status},{ new: true})
                const response = await addAdmin.save()
                successResponseHandler(res, response, 'Succesfully Updated Admin')
            }else{
                const { name, email, mobile, password, gender } = JSON.parse(req.body.data)
                const salt = await bcrypt.genSalt(12)
                const addAdmin = await CredentitalSchema.findOneAndUpdate({_id:req.params.id},{name, email, mobile, password, gender},{ new: true})
                addAdmin.password = await bcrypt.hash(addAdmin.password, salt)
               if(req.files.length > 0){
                addAdmin['avatar'] = req.files[0]
               } 
                const response = await addAdmin.save()
                successResponseHandler(res, response, 'Succesfully Updated Admin')
            }
          
        }
        catch (error) {
            errorResponseHandler(res, error, 'Error While Updating Admin')
        }
    })
}

exports.login = async (req, res) => {
    const check = await CredentitalSchema.findOne({ email: req.body.email }).populate('designation')
    if (!check) return errorResponseHandler(res, 'Error', 'User does not exist')
    const comparePassword = await bcrypt.compare(req.body.password, check.password)
    if (comparePassword)
        return successResponseHandler(res, check.generateToken(), 'Succesfully Logged In')
    else
        return errorResponseHandler(res, 'Error', 'Incorrect Password')
}