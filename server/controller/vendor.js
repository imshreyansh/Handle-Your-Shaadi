const {VendorSchema} = require('../model/vendor')
const { CredentitalSchema } = require('../model/credential')
const { handler: { errorResponseHandler, successResponseHandler }, upload: { uploadAvatar } } = require('../config')
const bcrypt = require('bcrypt')


exports.createVendor = async(req,res)=>{
    uploadAvatar(req,res,async(error,data)=>{
        if (error)
        return errorResponseHandler(res, error, 'Error While Creating')
        try{
            const checkMail = await VendorSchema.findOne({email:JSON.parse(req.body).email})
            if(checkMail) return errorResponseHandler(res,'Error','Vendor Already Exist')
            const salt = await bcrypt.genSalt(12)
           const { name, email, mobile, password, gender, designation,store } = JSON.parse(req.body.data)
           const newCredential = new CredentitalSchema({name, email, mobile, password, gender,designation})
           newCredential.password=await bcrypt.hash(newCredential.password,salt)
           newCredential['avatar'] = req.files[0]
           const saveCrdential = await newCredential.save()
           const newVendor = new VendorSchema({store})
           newVendor['store.storePhotos'] = req.files[0]
           newVendor['store.storeDocument'] = req.files[0]
           newVendor['crdential'] = saveCrdential._id
           const saveVendor = await newVendor.save()
           successResponseHandler(res,saveVendor,'Successfully added vendor')
        }
        catch(error){
            errorResponseHandler(res, error, 'Error while adding vendor')
        }
    })
}

