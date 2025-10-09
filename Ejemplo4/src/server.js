// #Fichero encargado de levantar una API REST con Express
//#import
import { config } from "dotenv";
import express from "express";
import dataAPI from "./db/db.js";
import cors from "cors";

config();

const PORT=process.env.PORT || 4001;
const NODE_ENV=process.env.NODE_ENV;
const SERVER_URL=process.env.SERVER_URL || "http://localhost";
const HOST=process.env.HOST;


const app = express();


// #CORS voy a permitir CORS
app.use(cors());


// #voy a permitir JSON como cuerpo de peticiones
app.use(express.json());


// #midleware 

app.use((req,res,next)=>{
    const datetime = new Date().toISOString();
    console.log(`${datetime} ${req.method} ${req.url}- IP ${req.ip}`);
    next();
});


// #Bienvenida
app.get('/', (req,res) =>{
    res.json({
        message:"Bienvenido a la API de juegos",
        version:"1.0.0",
        endpoints:{
            "GET /games": "Obtiene todos los juegos de mi api"
        }
    })
});

app.get('/games', (req, res)=>{
    console.log("Petición GET para traer los juegos de mi api");
    res.json({
        sucess: true,
        data: dataAPI,
        // #para que se autoincrementen : count:game.length
        count:dataAPI.length
    })
});


app.delete('/games/2', (req,res) => {
    console.log("Petición DELETE para eliminar el juego con id 2");
    res.json({
        sucess: true,
        data: dataAPI.splice(1,1)
    });
});

// #Iniciar servidor

app.listen(PORT, HOST, () => {
    console.log(`Servidor de Iván Balderas Carmona -----> ${SERVER_URL}:${PORT}`);
});

