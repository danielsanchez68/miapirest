import fs from'fs'
import util from '../../util/productos.js'

class ModelFile {

    constructor() {
        this.nombreArchivo = 'productos.json'
    }

    leerArchivo = async nombre => {
        let productos = []
        try {
            productos = JSON.parse(await fs.promises.readFile(nombre, 'UTF-8'))
        }
        catch {}

        return productos
    }

    escribirArchivo = async (nombre, productos) => {
        await fs.promises.writeFile(nombre, JSON.stringify(productos, null, '\t'))
    }

    obtenerProductos = async _ => {
        const productos = await this.leerArchivo(this.nombreArchivo)
        return productos
    }

    obtenerProducto = async id => {
        const productos = await this.leerArchivo(this.nombreArchivo)
        return productos.find(producto => producto.id == id) || {}
    }


    guardarProducto = async producto => {
        const productos = await this.leerArchivo(this.nombreArchivo)

        producto.id = util.getNextID(productos)
        productos.push(producto) 
        
        await this.escribirArchivo(this.nombreArchivo, productos)
        return producto   
    }

    actualizarProducto = async (id, producto) => {
        const productos = await this.leerArchivo(this.nombreArchivo)

        producto.id = id

        const index = productos.findIndex(producto => producto.id == id)
        if(index != -1) {
            const productoAnt = productos[index]
            const productoNuevo = {...productoAnt, ...producto}
            productos.splice(index,1,productoNuevo)

            await this.escribirArchivo(this.nombreArchivo, productos)
            return productoNuevo
        }
        else {
            producto.id = util.getNextID(productos)
            productos.push(producto)
            
            await this.escribirArchivo(this.nombreArchivo, productos)
            return producto
        }
    }

    borrarProducto = async id => {
        const productos = await this.leerArchivo(this.nombreArchivo)

        let producto = {}

        const index = productos.findIndex(producto => producto.id == id)
        if(index != -1) {
            producto = productos.splice(index,1)[0]
            await this.escribirArchivo(this.nombreArchivo, productos)
        }
        return producto
    }
}

export default ModelFile