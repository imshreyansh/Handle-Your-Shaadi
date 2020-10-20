const { createAdmin, login,getAllAdmin,updateAdmin } = require('../controller/credential')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/createAdmin', createAdmin)

    router.post('/login', login)

    router.get('/getAllAdmin', getAllAdmin)

    router.put('/updateAdmin/:id', updateAdmin)


    app.use('/api/credential/', router);

}