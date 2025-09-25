#!/bin/bash
# @autor:Ivan Balderas Carmona
# @comment:
# @description:Script que valida si tenemos instalados: git, node, npm y curl
# Crear un script utilizando el comando command -v  que verifique si tengo instalado o no los paquetes git, node, npm y curl.
# si alguno de dichos paquetes no esta en el sistema mostraremos mensaje de error.

clear
echo "Verificando los requisitos previos"
if command -v node > /dev/null 2>&1; then
	NODE_VERSION=$(node --version)
	echo "Node instalado correctamente: versión: $NODE_VERSION"
else
	echo "Node no esta instalado"
	exit 1
fi

if command -v git  > /dev/null 2>&1; then
        GIT_VERSION=$(git --version)
        echo "Git instalado correctamente: versión: $GIT_VERSION"
else
        echo "Git no esta instalado"
        exit 1
fi

if command -v npm  > /dev/null 2>&1;then
        NPM_VERSION=$(npm --version)
        echo "npm instalado correctamente: versión: $NPM_VERSION"
else
        echo "npm no esta instalado"
        exit 1
fi

if command -v curl  > /dev/null 2>&1;then
        CURL_VERSION=$(curl --version)
        echo "Curl instalado correctamente."
else
        echo "Curl no esta instalado"
        exit 1
fi

echo "Todos los paquetes instalados correctamente"

