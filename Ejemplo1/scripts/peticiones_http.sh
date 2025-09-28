#!/bin/bash
# @autor:Ivan Balderas Carmona
# @comment:
# @description:Script que lanza peticiones CRUD mediante el comando curl

curl -X GET "http://localhost:3000/authors/2"

curl -X POST "http://localhost:3000/authors" -H "Content-Type: application/json" -d '{"id": 11, "firstName": "Ivan", "lastName": "Balderas",
"specialty": "DAW", "country": "Spain"}'

curl -X PUT "http://localhost:3000/books/105" -H "Content-Type: application/json" -d '{"id": 105, "title": "La reina Roja",
"authorId": 9, "year": 2019, "topic": "Fantasy", "language": "Spanish"}'

curl -X PATCH "http://localhost:3000/books/102" -H "Content-Type: application/json" -d '{"language": "Php"}'

curl -X DELETE "http://localhost:3000/authors/10" 