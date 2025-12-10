document.getElementById("btnModelos").addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3002/api/modelos");
        if (!response.ok) {
            throw new Error(`Error fetching ollama: ${response.statusText}`);
        }
        const data = await response.json();
        console.table(data.modelos);
        const nombreModelos = data.modelos.map( modelo => modelo.name);
        document.getElementById("mostrarModelos").textContent = `Los modelos disponibles son: ${nombreModelos.join(", ")}`;

    } catch (error) {
        console.error("Error al obtener modelos", error);
        document.getElementById("mostrarModelos").textContent = "Error al obtener modelos";
    }
})