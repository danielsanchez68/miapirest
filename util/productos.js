function getNextID(productos) {
    return String(parseInt(productos[productos.length-1]?.id || 0) + 1)
}

function setNumberProducto(producto) {
    if(producto.precio) producto.precio = Number(producto.precio)
    if(producto.stock) producto.stock = Number(producto.stock)
    return producto
}

export default {
    getNextID,      // es igual a -> getNextID :  getNextID
    setNumberProducto
}