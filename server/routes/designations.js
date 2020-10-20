const { createDesignation,getAllDesignation } = require('../controller/designations')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/addDesignation', createDesignation)

    router.get('/getAllDesignation', getAllDesignation)

    app.use('/api/designation/', router);

}