const Router = require('express')
const orderController = require('../pgControllers/orderController')
const authMiddleware = require('../middleware/headermiddleware')
const router = new Router()

router.post('/create',orderController.create)
router.get('/getAll', orderController.getByUserId)
router.get('/getOne',  orderController.getById)
router.options('/create',  orderController.create)

module.exports  = router