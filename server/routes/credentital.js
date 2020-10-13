const { createAdmin, login } = require('../controller/credential')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/createAdmin', createAdmin)

    router.post('/login', login)

    app.use('/api/credential/', router);

}