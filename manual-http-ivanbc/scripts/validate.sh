#!/bin/bash
# @autor:Ivan Balderas Carmona
# @description:Script que valida si tenemos: package.json, src/db/db.json, .gitignore, .env.example, README.md, checklist.md, peticiones-crud.http, src/, src/crud-curl.js, images/, scripts/, 
# en el package.json verificar("type": "module", dotenv instalado, json-server instalado, script de server:up y crud:curl), almenos 6 capturas en images/ y mensaje de si ha pasado la validación o no.


echo "Validando los requisitos del proyecto..."

checkFile() {
    if [ -e "$1" ]; then
        echo "$1 existe"
    else
        echo "$1 no existe"
        FAILED=1
    fi
}

FAILED=0

checkFile "package.json"
checkFile "src/db/db.json"
checkFile ".gitignore"
checkFile ".env.example"
checkFile "README.md"
checkFile "checklist.md"
checkFile "peticiones-crud.http"
checkFile "src/"
checkFile "src/crud-curl.js"
checkFile "images/"
checkFile "scripts/"


if [ -f "package.json" ]; then

    grep -q '"type": "module"' package.json && echo "package.json tiene type: module" || { echo "package.json no tiene type: module"; FAILED=1; }

    npm list dotenv >/dev/null 2>&1 && echo "dotenv está instalado" || { echo "dotenv no está instalado"; FAILED=1; }

    npm list json-server >/dev/null 2>&1 && echo "json-server está instalado" || { echo "json-server no está instalado"; FAILED=1; }

    grep -q '"server:up"' package.json && echo "script server:up existe" || { echo "script server:up no existe"; FAILED=1; }

    grep -q '"crud:curl"' package.json && echo "script crud:curl existe" || { echo "script crud:curl no existe"; FAILED=1; }
fi


if [ -d "images" ]; then
    COUNT=$(ls images/ | wc -l)
    if [ "$COUNT" -ge 6 ]; then
        echo "Al menos 6 capturas existen en images/"
    else
        echo "Hay menos de 6 capturas en images/ (encontradas)"
        FAILED=1
    fi
fi


if [ "$FAILED" -eq 0 ]; then
    echo "Validación completada: pasó toda la validación correctamente"
else
    echo "Validación completada: hubo errores en la validación"
fi