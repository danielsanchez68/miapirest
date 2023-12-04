import express from 'express'
import RouterProductos from './router/productos.js'
import config from './config.js'
import CnxMongoDB from './model/DBMongo.js'


const app = express()
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


// -------------- Rutas / endpoints API RESTFUL (GET, POST, PUT, DELETE) -----------------
app.use('/api/productos', new RouterProductos().start())

// ------------ PROCESO DE CONEXIÓN HACIA LA BASE DE DATOS -------------
if(config.MODO_PERSISTENCIA == 'MONGODB') {
    await CnxMongoDB.conectar()
}

// ------------------------ LISTEN DEL SERVIDOR ------------------------
const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor ApiRestFul escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
