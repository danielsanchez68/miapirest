import CnxMongoDB from "../DBMongo.js"
import { ProductoModel } from "./models/producto.js"

class ModelMongo {

    constructor() {}

    obtenerProductos = async _ => {
        if(!CnxMongoDB.connection) return []
        const productos = await ProductoModel.find()
        return productos
    }

    obtenerProducto = async id => {
        if(!CnxMongoDB.connection) return {}
        const producto = await ProductoModel.findOne({_id:id})
        return producto || {}
    }

    guardarProducto = async producto => {
        if(!CnxMongoDB.connection) return {}
        
        const productoModel = new ProductoModel(producto)
        const productoInsertado = await productoModel.save()
        return productoInsertado
    }

    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connection) return {}

        await ProductoModel.updateOne({_id:id}, {$set: producto})

        const productoActualizado = await this.obtenerProducto(id)
        return productoActualizado
    }

    borrarProducto = async id => {
        if(!CnxMongoDB.connection) return {}

        const productoEliminado = await this.obtenerProducto(id)
        await ProductoModel.deleteOne({_id:id})
        return productoEliminado
    }
}

export default ModelMongo