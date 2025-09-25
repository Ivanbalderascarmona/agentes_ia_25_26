# Comandos para GET, POST, PUT, PATCH y DELETE

[Este comando hace un GET a la direccion de  jsonplaceholder]: #
curl -I -X GET "https://jsonplaceholder.typicode.com/users/9" | jq

[Comando POST]: #
curl -X POST "https://reqres.in/api/users" -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" -d '{"name":"Isaias", "job": "profesor"}'

[Comando DELETE]: #
curl -I -X DELETE "https://reqres.in/api/users/1" -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1"

[Comando para generar token]: #
curl -X POST "https://reqres.in/api/login" -H "Content-Type: application/json" -H "x-api-key: reqres-free-v1" -d '{"email":"eve.holt@reqres.in", 
"password": "12345"}'


[Comando para usar el token en peticiones]: #
curl -X GET "https://reqres.in/api/users/2"  -H "x-api-key: reqres-free-v1" -H "Authorization: Bearer QpwL5tke4Pnpja7X4" | jq