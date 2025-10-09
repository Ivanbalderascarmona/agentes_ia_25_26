// # Las importaciones siempre van al comienzo del archivo
import dotenv from "dotenv";
// # Cargo las variables .env a este fichero
dotenv.config();

// # Todas las variables estan en process.env.NOMBRE_VARIABLE


// # Mostrar por consola el valor de las variables de entorno

console.log("URL de acceso: ",process.env.URL);
console.log("Puerto: ",process.env.PORT);
console.log(`URL con puerto: ${process.env.URL}:${Number(process.env.PORT)+1}`);