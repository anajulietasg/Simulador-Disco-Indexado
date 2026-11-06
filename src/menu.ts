import readlineSync from "readline-sync";
import { SimuladorDisco } from "./SimuladorDisco";

const respuesta = readlineSync.question("Cuántos bloques tiene el disco? ");
const tamanio = Number(respuesta);      //lo convierte a número, rechaza 0, negativos, decimales y NaN

if (!Number.isInteger(tamanio) || tamanio <= 0) {
    console.log("Error: El tamaño del disco debe ser un número entero mayor a 0.");
} else {
    const disco = new SimuladorDisco(Number(tamanio));
    console.log(`Disco de ${tamanio} bloques creado.`);
    let salir = false;

    while (!salir) {
        console.log("\n1. Crear archivo\n2. Eliminar archivo\n3. Ver mapa de bloques\n4. Ver tabla de inodos\n5. Ver métricas\n6. Salir");
        const opcion = readlineSync.question("Elegí una opción: ");

        switch (opcion) {
        case "1": {
            const nombre = readlineSync.question("Ingrese el nombre del archivo: ");
            const tamArchivo = Number(readlineSync.question("Ingrese el tamaño del archivo: "));
            disco.crearArchivo(nombre, tamArchivo);
            break;
        }
        case "2": {
            const nombre = readlineSync.question("Ingrese el nombre del archivo a eliminar: ");
            disco.eliminarArchivo(nombre);
            break;
        }
        case "3":
            disco.mostrarMapa();
            break;
        case "4":
            disco.mostrarTablaInodos();
            break;
        case "5":
            disco.mostrarMetricas();
            break;
        case "6":
            salir = true;
            console.log("Fin de la simulación.");
            break;
        default:
            console.log("Opción inválida. Por favor, elija una opción del 1 al 6.");
        }
    }
}
