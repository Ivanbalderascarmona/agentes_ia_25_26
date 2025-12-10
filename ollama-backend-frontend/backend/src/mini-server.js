import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';


// cargamos las variables de entorno
config();


// inicializamos la aplicacion
const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;
const AI_API_URL = process.env.AI_API_URL || 'http://localhost:11434';
const AI_MODEL = process.env.AI_MODEL || 'llama3.2:1b';

// middleware
app.use(express.json());
app.use(cors());

// ruta de prueba
// 1. info de estado
const getAppInfo = () => ({
    name: "Mini-Server backend ollama",
    version: "1.0.0",
    status: "running",
    description: "Servidor backend para manejar solicitudes de IA",
    endpoints: {
        "GET /api": "Informacion básica del servidor y del modelo de IA",
        "GET /api/modelos": "Informaciónd del modelo de IA configurado en ollama",
        "POST /api/consulta": "Enviar un prompt al modelo de IA y obtener la respuesta",
    },
    model: AI_MODEL,
    host: `${HOST}:${PORT}`,
    ollama: {
        url: AI_API_URL,
    },
});

// ENDPOINTS UTILIZADOS por el frontend

// ENDPOINT de informacion básica del servidor
app.get('/', (req, res) => {
    res.json(getAppInfo());
});

// ENDPOINT /api
app.get('/api', (req, res) => {
    res.json(getAppInfo());
});

//Endpoint /api/modelos
app.get('/api/modelos', async (req, res) => {
    try {
        const response = await fetch(`${AI_API_URL}/api/tags`,{
            method: "GET",
            headers: {
                "Content-Type": "aplication/json",
            },
            signal: AbortSignal(5000),
        });
        if(!response.ok){
            return res.status(response.status).json({error: `Error fetching ollama: ${response.statusText}`})
        }
        const data = await response.json()
        const modelos = data.models || [];
        res.json({
            total: modelos.length,
            modelos,
            origen: AI_API_URL,
        });
    } catch (error) {
        res.status(502).json({
            error: "Error al obtener modelos ", 
            message: error.message,
        });
    }
});

// endpoint para enviar consulta
app.post("/api/consulta", async (req, res) => {
    const { prompt, model } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({
            error: "Elcampo 'prompt es obligatorio y debe ser una cadena de texto'",
        });
    }
    const targetModel = model || AI_MODEL;
    try {
        // peticion a ollama
        const response = await fetch(`${AI_API_URL}/api/generate`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: targetModel,
                prompt,
                stream:false,
            }),
            signal: AbortSignal.timeout(20000),
        });

        const data = await response.json();
        res.json({
            prompt,
            modelo:targetModel,
            response: data.response || "",
            latencyMs: data.latencuMs ||undefined,
            origen: AI_API_URL,
        });
    } catch (error) {
        return res  
            .status(response.status)
            .json({error: "Error al fetching a oollama"});

        
    }
    
    
    
});

//lanzamos el servidor
app.listen(PORT, HOST, () =>{
    console.log(
        `Miniserver backend ollama by IvanBC
        Servidor backend mini-server escuchando en ${SERVER_URL} (entorno ${process.env.NODE_ENV})
        Porfavor accede a: ${SERVER_URL}/api para ver la informacion del servidor
        Asegurate de que el servicio de ollama este corriendo en el puerto ${AI_API_URL}`
    );
});

export default app;