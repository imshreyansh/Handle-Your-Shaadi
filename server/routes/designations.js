const { createDesignation } = require('../controller/designations')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/addDesignation', createDesignation)

    app.use('/api/designation/', router);

}