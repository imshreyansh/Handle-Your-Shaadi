const { handler: { errorResponseHandler, successResponseHandler }, upload: { uploadAvatar } } = require('../config')
const {TypeOfStoreSchema} = require('../model/types')

exports.createTypeOfStore = async(req,res)=>{
    const validate = await TypeOfStoreSchema.findOne({type:((req.body.type).toLowerCase())})
    if(validate) return errorResponseHandler(res,'Error','This Type does already exists')

    const newType = new TypeOfStoreSchema({type:(req.body.type).toLowerCase()})
    newType.save()
    .then((response)=>{
        successResponseHandler(res,response,'Type is added successfully')
    })
    .catch((error)=>{
        errorResponseHandler(res,error,'Error while adding type')
    })
}

exports.getAllTypes=async(req,res)=>{
TypeOfStoreSchema.find({})
.then((response)=>{
    successResponseHandler(res,response,'Successfully got all types')
})
.catch((error)=>{
    errorResponseHandler(res,error,'Error while getting types')
})
}

exports.getTypeById=async(req,res)=>{
    TypeOfStoreSchema.findOne({_id:req.params.id})
    .then((response)=>{
        successResponseHandler(res,response,'Successfully got type')
    })
    .catch((error)=>{
        errorResponseHandler(res,error,'Error while getting type')
    })
}

exports.updateType = async(req,res)=>{
    const {status} = req.body
    if(status !== undefined) { 
        TypeOfStoreSchema.findOneAndUpdate({_id:req.params.id},{status:req.body.status},{new:true})
        .then((response)=>{
            successResponseHandler(res,response,'Succesfully Updated Type')
        })
        .catch((error)=>{
            errorResponseHandler(res,error,'Error while updating type')
        })
    }else{
        TypeOfStoreSchema.findOneAndUpdate({_id:req.params.id},{type:req.body.type},{new:true})
        .then((response)=>{
            successResponseHandler(res,response,'Succesfully Updated Type')
        })
        .catch((error)=>{
            errorResponseHandler(res,error,'Error while updating type')
        })
    }
   
}