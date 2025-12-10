FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV API_PORT=3000
ENV QDRANT_URL=http://qdrant:6333
ENV QDRANT_COLLECTION_NAME=fragmentos_rof
ENV OLLAMA_URL=http://ollama:11434
ENV OLLAMA_EMBEDDING_MODEL=nomic-embed-text
ENV OLLAMA_LLM_MODEL=llama3.2:1b

EXPOSE 3000

CMD ["node", "server.js"]
