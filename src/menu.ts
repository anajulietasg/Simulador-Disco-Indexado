import readlineSync from "readline-sync";
import { SimuladorDisco } from "./SimuladorDisco";

const respuesta = readlineSync.question("Cuántos bloques tiene el disco? ");
const tamanio = Number(respuesta);      //lo convierte a número

if (isNaN(Number(tamanio)) || Number(tamanio) <= 0) {
    console.log("Error: El tamaño del disco debe ser un número mayor a 0.");
} else {
    const disco = new SimuladorDisco(Number(tamanio));
    console.log(`Disco de ${tamanio} bloques creado.`);
}
