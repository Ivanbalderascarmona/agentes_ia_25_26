import express from "express";
import cors from "cors";
import { config } from "dotenv";


//# 0: Cargar variables de entorno en memoria

config();

//# Primer paso: crear un servidor con Express

const app = express();

//# 2: Crear las variables basandonos en las variables de entorno cargadas en memoria con config

const PORT=Number(process.env.PORT) || 3002
const HOST=process.env.HOST || "0.0.0.0"
const NODE_ENV=process.env.NODE_ENV || "development"
const SERVER_URL=process.env.SERVER_URL || "http://localhost:3002"
const AI_API_URL=process.env.AI_API_URL || "http://localhost:11434"
const AI_MODEL=process.env.AI_MODEL || "llama3.2:1b"


//# 3: Paso midleware a mi aplicación:

// # a) para habilitar los cors en los navegadores
app.use(cors());

//# b) Habilitar JSON para preguntas y respuestas
app.use(express.json())


//# 4: Crear función que muestre info al usuario
//          # Se cambia el {} y return por un () ya que el return es un objeto 
const getInfoApi = () => ({
    
    service: "Servicio api-ollama",
    status: "ready",
    endpoints: {
        "GET /api": "Mostramos información de la Api Ollama",
        "GET /api/modelos": "Mostramos información de los modelos disponibles",
        "POST /api/consulta": "Envía un prompt para realizar consultas a la IA",
    },
    model: AI_MODEL,
    host: `${HOST}:${PORT}`,
    ollama_url: AI_API_URL
});


//# 5: General los endpoints


// --> /

app.get("/", (req, res) => {
    res.json(getInfoApi());
})

// --> /api
app.get("/api", (req, res) => {
    res.json(getInfoApi());
})


// --> /api/modelos

app.get("/api/modelos", async (req, res) => {
    try {
        const response = await fetch(`${AI_API_URL}/api/tags`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(5000)
        });
        if(!response.ok) throw new Error("❌ Error en la petición");

        const data = await response.json();
        const models = data.models || [];
        const nameModels= models.map(model => ({modelo: model.model}))

        res.json(nameModels);
        
    } catch (error) {
        res.status(502).json({
            error: "Fallo en el acceso al servidor o los modelos",
            message:error.message,
        });
    }
    //# Metodo con fetch y then()
    // const URL = `${AI_API_URL}/api/tags`;
    // fetch(URL)
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error("Error en la petición");
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("<---------- Modelos ---------->");
    //         console.log("-", data.model)
    //         return data;
    //     })
    //     .catch(error => console.log("Error ...",error))
    //     .finally(() => console.log("Cerrando petición ..."))
});


// --> /api/consulta

app.use("/api/consulta", async (req, res) => {
    const { prompt, model } = req.body || {};
        // el prompt es de tipo string?? 
        if(!prompt || typeof prompt !== "string"){
            return res.status(400).json({
                error: "Error al escribir el prompt",
                message:"",
            })
        }
        const modelSelect = model || AI_MODEL

    try {
        const response = await fetch(`${AI_API_URL}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: modelSelect,
                prompt,
                stream: false
            }),
            signal: AbortSignal.timeout(300000)
        });
        if(!response.ok) throw new Error("❌ Error en la petición");

        const data = await response.json();
        res.json({
            prompt,
            model: modelSelect,
            response: data.response
        });

    } catch (error) {
            res.status(502).json({
            error: "Fallo en el acceso a datos o en la petición",
            message: error.message
        })
    }
})

// Hacerle las peticiones el /chat e  ir guardando toda la conversacion en una variable




//# 6: Levantar el servidor express para escuchar peticiones a mis endpoints
app.listen( PORT, HOST, () => {
    console.log("------------- 🏅 Servidor express funcionando 🏅 -------------");
    console.log(`\t Servidor escuchando en el http://${HOST} en el puerto ${PORT}`);
    console.log("\t Escuchando peticiones ...");
});