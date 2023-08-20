const Router = require('express')
const router = new Router()
const storyController = require('../pgControllers/storyController')

router.post('/create', storyController.create)
router.get('/get', storyController.getAll)

module.exports  = router