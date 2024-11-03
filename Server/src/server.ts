import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

// conectar a db
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.green.bold("Conexion exitosa a la db"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error al conectar a la db"));
  }
}

connectDB();

const server = express();

const corsOptions : CorsOptions = {
  origin: function(origin, callback) {
    if(origin === process.env.FRONTEND_URL){
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
  } 
    
  }

}
server.use(cors(corsOptions))

//Leer deatos de formulario
server.use(express.json())

server.use(morgan('dev'))

server.use("/api/products", router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec) )

export default server;
