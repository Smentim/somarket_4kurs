const Router = require('express')
const router = new Router()
const itemRouter = require('./itemsRouter')
const classRouter = require('./classesRouter')
const typeRouter = require('./typesRouter')
const userRouter = require('./usersRouter')


router.use('/user', userRouter)
router.use('/class', classRouter)
router.use('/type', typeRouter)
router.use('/item', itemRouter)


module.exports = router