const { Designations } = require('../model/designations');
const { handler: { errorResponseHandler, successResponseHandler } } = require('../config')


exports.createDesignation = async (req, res) => {
    if (req.body) {
        const check = await Designations.findOne({ designation: req.body.designation })
        if (check) return errorResponseHandler(res, 'Error', 'Designation Already Exist')
        const addDesignation = new Designations({ designation: req.body.designation })
        addDesignation.save()
            .then((response) => {
                successResponseHandler(res, response, 'Successfully Added Designation')
            })
            .catch((error) => {
                errorResponseHandler(res, 'Error', 'Error while adding designation')
            })
    }
}

exports.getAllDesignation = async (req,res)=>{
    Designations.find({})
    .then((response)=>{
        successResponseHandler(res,response,'Successfully get all designations')
    })
    .catch((error)=>{
        errorResponseHandler(res, 'Error', 'Error while getting designation')

    })
}
