const Router = require('express')
const router = new Router() 
const orderRouter = require('./orderRouter')
//const userRouter = require('./usersRouter')
//const storyRouter = require('./storyRouter')



router.use('/order', orderRouter)
//router.use('/user', userRouter)
//router.use('/story', storyRouter)


module.exports  = router