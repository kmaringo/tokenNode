const {Router} = require('express')

const route = Router()

//Importar el controlador
const {getServicio, postServicio, putServicio, deleteServicio} = require('../controllers/servicio')
const  {isAuthenticated}  = require('../controllers/auth')

route.get('/', isAuthenticated, getServicio)

route.post('/', isAuthenticated, postServicio)

route.put('/', putServicio)

route.delete('/', deleteServicio)


module.exports = route 