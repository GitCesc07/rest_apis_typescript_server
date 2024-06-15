import express from "express";
import colors from "colors";
import cors,{CorsOptions} from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log("Coneción exitosa a la base de datos")
    } catch (error) {
        // console.log(error)
        console.log(colors.bgRed.white( "Hubo un error al conectar la base de datos"))
    }
}
connectDB()

// Instancia de express
const server = express()

// Permitir conexiones CORS
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if (origin === process.env.FRONTEND_URL) {
          callback(null, true);
        } else {
          callback(new Error("Error de CORS"));
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

// Uso de morgan
server.use(morgan("dev"))

// Llamado a la REST API
server.use("/api/products", router)

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions) )

export default server