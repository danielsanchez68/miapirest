import dotenv from 'dotenv'

dotenv.config()

//console.log(process.env)
//console.log(process.env.MODO_PERSISTENCIA)
//console.log(process.env.STRCNX)

const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MEM'
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1/mibase'

export default {
    PORT,     // PORT: PORT
    MODO_PERSISTENCIA,
    STRCNX
}