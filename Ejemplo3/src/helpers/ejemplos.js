
//importaciones
import { config } from "dotenv";
import { exec } from "child_process";

// declaracion de las variables
config();

const API_URL = process.env.API_URL;



export const getAllUsers = () => {
    // Función para obtener todos los usuarios
    const URL_BASE = `${API_URL}/users`;
    const cmd =`curl -s  GET ${URL_BASE}`;
    

    exec(cmd, (error, stdout, stderr)=>{
        if(error){
            console.error("Error ejecutando el curl--->", error.message);
            return;
        }
        if(stderr){
            console.error("Error en la salida--->", stderr);
            return;
        }
        const data = JSON.parse(stdout);
        console.log(data);
        console.table(data);

    });
}