const Router = require('express')
const OrderController = require('../pgControllers/orderController')
const router = new Router()

router.post('/create', OrderController.create)
router.get('/get', OrderController.getAll)

module.exports  = router