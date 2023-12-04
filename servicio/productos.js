import util from '../util/productos.js'
import validar from './validaciones/producto.js'

import ModelMem from '../model/DAO/productosMem.js'
import ModelFile from '../model/DAO/productosFile.js'
import ModelMongo from '../model/DAO/productosMongoDB.js'
import ModelFactory from '../model/DAO/productosFactory.js'
import config from '../config.js'

class Servicio {

    constructor() {
        //this.model = new ModelFile()
        //this.model = new ModelMem()
        //this.model = new ModelMongo()
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerProductos = async id => {
        if(id) {
            const producto = await this.model.obtenerProducto(id)
            return producto
        }
        else {
            const productos = await this.model.obtenerProductos()
            return productos
        }
    }

    guardarProducto = async producto => {
        const error = validar(producto)
        if(!error) {
            producto = util.setNumberProducto(producto)
            const productoGuardado = await this.model.guardarProducto(producto)
            return productoGuardado
        }
        else {
            throw new Error(error.details[0].message)
        }
    }

    actualizarProducto = async (id, productoEntrada) => {
        const producto = util.setNumberProducto(productoEntrada)
        const productoActualizado = await this.model.actualizarProducto(id, producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoEliminado = await this.model.borrarProducto(id)
        return productoEliminado
    }
}

export default Servicio
