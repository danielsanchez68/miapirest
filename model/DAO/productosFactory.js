import ModelFile from "./productosFile.js"
import ModelMem from "./productosMem.js"
import ModelMongo from "./productosMongoDB.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('***** Persistencia en Memoria *****')
                return new ModelMem()

            case 'FILE':
                console.log('***** Persistencia en fileSystem *****')
                return new ModelFile()

            case 'MONGODB':
                console.log('***** Persistencia en MongoDB *****')
                return new ModelMongo()

            default: 
                console.log('***** Persistencia en Memoria (default) *****')
                return new ModelMem()
        }
    }
}

export default ModelFactory