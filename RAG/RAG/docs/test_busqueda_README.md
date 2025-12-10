# 🔍 Script: test_busqueda.js

## Descripción

Este script prueba la búsqueda semántica utilizando embeddings y la base de datos vectorial Qdrant. Permite realizar consultas en lenguaje natural y encontrar los fragmentos de texto más similares semánticamente.

## 📋 Requisitos

### Dependencias
- `@qdrant/qdrant-js` - Cliente de Qdrant
- `dotenv` - Variables de entorno
- `fetch` - API global de Node.js (built-in)

### Servicios
- **Qdrant**: Base de datos vectorial con fragmentos cargados
- **Ollama**: Servidor para generar embeddings de consultas

## ⚙️ Configuración

### Variables de entorno (.env)

```bash
# Qdrant
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION_NAME=fragmentos_rof

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

### Preparación

Asegúrate de que los servicios estén ejecutándose y los datos estén cargados:

```bash
# 1. Servicios Docker
docker-compose up -d

# 2. Cargar datos en Qdrant (si no lo has hecho)
npm run cargar-bd
```

## 🔧 Funciones principales

### 1. `calcularSimilitud(v1, v2)`

Calcula la similitud de coseno entre dos vectores.

**Parámetros:**
- `v1` (number[]): Primer vector
- `v2` (number[]): Segundo vector

**Retorna:**
- `number`: Similitud de coseno (0-1)
  - 0 = Completamente diferentes
  - 1 = Idénticos

**Fórmula:**
```
similitud = (v1 · v2) / (||v1|| * ||v2||)
```

**Ejemplo de uso:**
```javascript
const v1 = [1, 2, 3];
const v2 = [4, 5, 6];
const sim = calcularSimilitud(v1, v2); // 0.974...
```

### 2. `generarEmbedding(texto)`

Genera un embedding (vector) para un texto usando Ollama.

**Parámetros:**
- `texto` (string): Texto para convertir a vector

**Retorna:**
- `Promise<number[]>`: Vector de embedding

**Endpoint utilizado:**
```
POST http://localhost:11434/api/embeddings
Body: {
  "model": "nomic-embed-text",
  "prompt": "texto de consulta"
}
```

**Ejemplo de uso:**
```javascript
const embedding = await generarEmbedding("¿Cuál es el horario?");
// Retorna: [0.123, -0.456, 0.789, ..., 0.321] (768 dimensiones)
```

### 3. `buscarFragmentosSimilares(consulta, limite = 3)`

Busca fragmentos similares a la consulta usando búsqueda vectorial en Qdrant.

**Parámetros:**
- `consulta` (string): Texto de la consulta
- `limite` (number): Número máximo de resultados (default: 3)

**Retorna:**
- `Promise<Array>`: Array de fragmentos ordenados por similitud

**Estructura de cada resultado:**
```javascript
{
  contenido: "Texto del fragmento...",
  fuente: "ROF IES HLanz",
  pagina: 5,
  similitud: 0.87
}
```

**Proceso interno:**
1. Genera el embedding de la consulta usando Ollama
2. Realiza búsqueda vectorial en Qdrant
3. Qdrant calcula automáticamente la similitud de coseno
4. Retorna los N resultados más similares

**Ejemplo de uso:**
```javascript
const resultados = await buscarFragmentosSimilares(
  "¿Cuál es el horario de entrada?",
  5
);
```

### 4. `mostrarResultados(consulta, resultados)`

Formatea y muestra los resultados de búsqueda en consola.

**Formato de salida:**
```
🔍 Buscando fragmentos similares a: "¿Cuál es el horario de entrada?"
📍 Resultados (similitud):

1. [0.87] "El horario de entrada es de 08:00 a 08:30..."
2. [0.72] "Los estudiantes deben llegar puntualmente..."
3. [0.65] "El retraso se justifica solamente en caso de..."
```

## 🚀 Ejecución

### Comando NPM
```bash
npm run test-busqueda
```

### Comando directo
```bash
node scripts/test_busqueda.js
```

## 📊 Salida esperada

El script ejecuta automáticamente tres consultas de prueba:

```
✅ Colección encontrada con 87 fragmentos

════════════════════════════════════════════════════════════════════════════════

🔍 Buscando fragmentos similares a: "¿Cuál es el horario de entrada?"
📍 Resultados (similitud):

1. [0.87] "El horario de entrada es de 08:00 a 08:30..."
2. [0.72] "Los estudiantes deben llegar puntualmente..."
3. [0.65] "El retraso se justifica solamente en caso de..."

────────────────────────────────────────────────────────────────────────────────

🔍 Buscando fragmentos similares a: "¿Qué hacer ante inasistencias?"
📍 Resultados (similitud):

1. [0.82] "a las clases y actividades programadas. Las faltas de asistencia deberán..."
2. [0.75] "justificarse documentalmente en un plazo máximo de tres días..."
3. [0.68] "Las ausencias no justificadas tendrán las consecuencias establecidas..."

────────────────────────────────────────────────────────────────────────────────

🔍 Buscando fragmentos similares a: "Uniforme del centro"
📍 Resultados (similitud):

1. [0.79] "El alumnado deberá asistir al centro con vestimenta apropiada..."
2. [0.71] "materiales y económicos del centro, así como los documentos oficiales..."
3. [0.65] "Se respetarán las instalaciones, equipamiento y documentación..."

────────────────────────────────────────────────────────────────────────────────

✅ Pruebas de búsqueda completadas
```

## 🎯 Personalización

### Modificar consultas de prueba

Edita el array `consultas` en el script:

```javascript
const consultas = [
    "¿Cuál es el horario de entrada?",
    "¿Qué hacer ante inasistencias?",
    "Uniforme del centro",
    "Tu nueva consulta aquí"  // Añadir más consultas
];
```

### Cambiar número de resultados

Modifica el parámetro `limite` en la llamada:

```javascript
const resultados = await buscarFragmentosSimilares(consulta, 5); // Cambiar de 3 a 5
```

### Usar como módulo

El script exporta las funciones principales:

```javascript
import { buscarFragmentosSimilares } from './scripts/test_busqueda.js';

const resultados = await buscarFragmentosSimilares("mi consulta", 10);
console.log(resultados);
```

## 🔬 Cómo funciona la búsqueda semántica

### 1. Generación de embedding de consulta
```
"¿Cuál es el horario de entrada?"
         ↓ (Ollama)
[0.123, -0.456, 0.789, ..., 0.321]  (768 dimensiones)
```

### 2. Búsqueda vectorial en Qdrant
Qdrant compara el vector de la consulta con todos los vectores almacenados usando similitud de coseno:

```
Vector consulta · Vector fragmento
─────────────────────────────────
||Vector consulta|| × ||Vector fragmento||
```

### 3. Resultados ordenados
Qdrant retorna los fragmentos más similares ordenados por score (similitud).

## 📈 Interpretación de scores

- **0.90 - 1.00**: Muy alta similitud (casi idénticos semánticamente)
- **0.70 - 0.89**: Alta similitud (muy relacionados)
- **0.50 - 0.69**: Similitud moderada (relacionados)
- **0.30 - 0.49**: Baja similitud (algo relacionados)
- **0.00 - 0.29**: Muy baja similitud (poco relacionados)

## ⚠️ Consideraciones

### Calidad de los resultados

La calidad depende de:
1. **Modelo de embeddings**: `nomic-embed-text` es bueno para español
2. **Cantidad de datos**: Más fragmentos = mejor cobertura
3. **Calidad de fragmentación**: Chunks bien divididos dan mejores resultados

### Performance

- La generación de embedding tarda ~100-500ms
- La búsqueda en Qdrant es muy rápida (<10ms)
- Tiempo total por consulta: ~200-600ms

### Qdrant vs Cálculo manual

El script incluye `calcularSimilitud()` para referencia, pero **Qdrant ya calcula la similitud automáticamente** durante la búsqueda, siendo mucho más eficiente que calcularla manualmente para cada fragmento.

## 🐛 Solución de problemas

### Error: "La colección está vacía"
```bash
# Cargar datos primero
npm run cargar-bd
```

### Error de conexión con Ollama
```bash
# Verificar que Ollama esté corriendo
docker ps | grep ollama

# Probar el endpoint manualmente
curl http://localhost:11434/api/embeddings -d '{
  "model": "nomic-embed-text",
  "prompt": "test"
}'
```

### Error de conexión con Qdrant
```bash
# Verificar que Qdrant esté corriendo
docker ps | grep qdrant

# Verificar logs
docker logs qdrant
```

### Scores muy bajos

Si todos los scores son bajos (<0.5):
1. Verifica que la consulta esté relacionada con el contenido
2. Asegúrate de usar el mismo modelo de embeddings para indexar y buscar
3. Considera refinar la fragmentación de documentos

## 📚 Recursos adicionales

- [Similitud de coseno](https://es.wikipedia.org/wiki/Similitud_coseno)
- [Qdrant Search API](https://qdrant.tech/documentation/concepts/search/)
- [Ollama Embeddings API](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-embeddings)
- [RAG (Retrieval Augmented Generation)](https://www.pinecone.io/learn/retrieval-augmented-generation/)
