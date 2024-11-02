import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

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

//Leer deatos de formulario
server.use(express.json())

server.use("/api/products", router);

server.get('/api', (req, res) => {
  res.json({msg: 'Desde api'})
})

export default server;
