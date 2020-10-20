const { createTypeOfStore,getTypeById,getAllTypes,updateType} = require('../controller/types')

exports.routes = (express, app) => {

    const router = express.Router();

    router.post('/addType', createTypeOfStore)

    router.get('/getAllTypes', getAllTypes)

    router.get('/getTypeById:id',getTypeById)

    router.put('/updateType/:id', updateType)


    app.use('/api/types/', router);

}