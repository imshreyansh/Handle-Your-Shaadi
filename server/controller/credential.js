const { CredentitalSchema } = require('../model/credential')
const { handler: { errorResponseHandler, successResponseHandler }, upload: { uploadAvatar } } = require('../config')
const bcrypt = require('bcrypt')

exports.createAdmin = (req, res) => {
    uploadAvatar(req, res, async (error, data) => {
        if (error)
            return errorResponseHandler(res, error, 'Error While Creating')
        try {
            const check = await CredentitalSchema.findOne({ email: req.body.email })
            if (check) return errorResponseHandler(res, 'Error', 'User Already Exist')
            const { name, email, mobile, password, gender, designation } = req.body
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

exports.login = async (req, res) => {
    const check = await CredentitalSchema.findOne({ email: req.body.email }).populate('designation')
    if (!check) return errorResponseHandler(res, 'Error', 'User does not exist')
    const comparePassword = await bcrypt.compare(req.body.password, check.password)
    if (comparePassword)
        return successResponseHandler(res, check.generateToken(), 'Succesfully Logged In')
    else
        return errorResponseHandler(res, 'Error', 'Incorrect Password')
}