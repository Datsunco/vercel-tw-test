const Router = require('express')
const orderController = require('../pgControllers/orderController')
const authMiddleware = require('../middleware/headermiddleware')
const router = new Router()

router.post('/create', authMiddleware,orderController.create)
router.get('/getAll', authMiddleware, orderController.getByUserId)
router.get('/getOne', authMiddleware, orderController.getById)
router.options('/create', authMiddleware, orderController.create)

module.exports  = router