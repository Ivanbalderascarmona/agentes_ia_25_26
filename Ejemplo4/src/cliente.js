// el fichero cliente lanzara peticiones a la API REST


// petición GET a /posts
const  traerPost = async () => {
    try {
        const response= await fetch("http://localhost:4000/posts");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error al traer los post vinos", error);
    }
};



//async function traerPostVinos(){}

// peticion post a /posts
const postPost = async () => {
    try {
        const response = await fetch("http://localhost:4000/posts");
    }
}