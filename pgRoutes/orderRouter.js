const Router = require('express')
const orderController = require('../pgControllers/orderController')
const router = new Router()

router.post('/create', orderController.create)
router.get('/getAll', orderController.getByUserId)
router.get('/getOne', orderController.getById)

module.exports  = router