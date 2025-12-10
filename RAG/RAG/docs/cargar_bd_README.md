# 💾 Script: cargar_bd.js

## Descripción

Este script almacena los embeddings generados previamente en una base de datos vectorial Qdrant. Qdrant es una base de datos especializada en búsqueda de similitud vectorial, ideal para aplicaciones RAG (Retrieval Augmented Generation).

## 📋 Requisitos

### Dependencias Node.js
- `@qdrant/qdrant-js` - Cliente oficial de Qdrant para Node.js
- `fs` - Sistema de archivos (incluido en Node.js)
- `dotenv` - Gestión de variables de entorno

### Servicios externos
- **Qdrant**: Base de datos vectorial ejecutándose en Docker
  - Puerto: 6333 (HTTP/REST)
  - Configurado en `docker-compose.yml`

## ⚙️ Configuración

### Variables de entorno (.env)

```bash
# URL del servidor Qdrant
QDRANT_URL=http://localhost:6333

# Nombre de la colección
QDRANT_COLLECTION_NAME=fragmentos_rof
```

### Levantar Qdrant con Docker

```bash
docker-compose up -d
```

## 🔧 Funciones principales

### 1. `inicializarBD()`
Inicializa la base de datos Qdrant:
- Verifica si la colección existe
- Elimina la colección anterior para evitar duplicados
- Lee la dimensionalidad de los embeddings del archivo JSON
- Crea una nueva colección con la configuración adecuada:
  ```javascript
  {
    name: "fragmentos_rof",
    vectors: {
      size: 768,  // Dimensión detectada automáticamente
      distance: "Cosine"  // Métrica de similitud
    }
  }
  ```

### 2. `insertarFragmentos()`
Inserta los fragmentos en lotes:
- Lee `datos/embeddings.json`
- Valida que no haya IDs duplicados
- Procesa los fragmentos en lotes de 50 para optimizar rendimiento
- Cada fragmento se almacena con:
  - **ID**: Identificador único
  - **Vector**: Embedding del fragmento
  - **Payload**:
    - `contenido`: Texto del fragmento
    - `fuente`: Origen del documento
    - `pagina`: Número de página
    - `creado_en`: Timestamp de creación
- Muestra barra de progreso ASCII en tiempo real

### 3. `verificarBD()`
Verifica la integridad de la base de datos:
- Cuenta el total de fragmentos almacenados
- Muestra el tamaño del archivo `embeddings.json`
- Recupera un punto aleatorio para validar:
  - Presencia de vector
  - Presencia de payload con contenido
- Confirma la integridad de los datos

### 4. `validarDuplicados(fragmentos)`
Valida que no haya IDs duplicados:
- Compara la cantidad de IDs con la cantidad de IDs únicos
- Emite advertencia si encuentra duplicados
- Los duplicados se manejan automáticamente con `upsert`

### 5. `generarBarraProgreso(current, total, width)`
Genera una barra de progreso visual:
```
[████████████████████░░░░░░░░] 67/87 77%
```

## 🚀 Ejecución

### Comando NPM
```bash
npm run cargar-bd
```

### Comando directo
```bash
node scripts/cargar_bd.js
```

## 📊 Salida esperada

```
🗄 Inicializando base de datos...
✅ Tabla 'fragmentos' creada
📥 Insertando 87 fragmentos...
[████████████████████████████████████████] 87/87 100%
✅ Base de datos cargada exitosamente
📊 Fragmentos en BD: 87
💾 Tamaño de archivo: 0.5 MB
✅ Integridad verificada

```

## 🔄 Flujo de trabajo completo

1. **Procesar documentos**: `npm run procesar`
   - Convierte ROF a chunks JSON
   
2. **Generar embeddings**: `npm run embeddings`
   - Crea vectores para cada chunk
   
3. **Cargar en Qdrant**: `npm run cargar-bd`
   - Almacena vectores en BD (este script)

### Ejecutar todo el pipeline
```bash
npm run ingesta
```

## ⚠️ Consideraciones

### Gestión de duplicados
- El script elimina la colección existente antes de crear una nueva
- Esto asegura que no haya duplicados
- Si deseas mantener datos anteriores, comenta la línea de eliminación

### Optimización de rendimiento
- **Batch size**: 50 fragmentos por lote
  - Ajustar según memoria disponible
- **Wait mode**: `wait: true` asegura que cada lote se complete antes de continuar

### Dimensionalidad de vectores
- El script detecta automáticamente la dimensión de los embeddings
- Valor por defecto: 768 (modelo `nomic-embed-text`)

## 🐛 Solución de problemas

### Error: "No existe datos/embeddings.json"
```bash
# Ejecutar primero la generación de embeddings
npm run embeddings
```

### Error de conexión con Qdrant
```bash
# Verificar que el contenedor esté corriendo
docker ps | grep qdrant

# Iniciar Qdrant si está detenido
docker-compose up -d
```

### Puerto ocupado
```bash
# Verificar qué proceso usa el puerto 6333
netstat -ano | findstr :6333

# Si es necesario, cambiar el puerto en docker-compose.yml
```

## 📚 Recursos adicionales

- [Documentación Qdrant](https://qdrant.tech/documentation/)
- [Cliente JS de Qdrant](https://github.com/qdrant/qdrant-js)
- [Docker Compose](https://docs.docker.com/compose/)
