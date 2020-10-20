const { createVendor} = require('../controller/vendor')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/createVendor', createVendor)


    app.use('/api/vendor/', router);

}