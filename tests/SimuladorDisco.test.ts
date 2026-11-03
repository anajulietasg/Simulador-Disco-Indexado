import { describe, test, expect } from "vitest";
import { SimuladorDisco } from "../src/SimuladorDisco";

describe("crearArchivo", () => {
  test("asigna los primeros bloques libres y los anota en el inodo", () => {
    const disco = new SimuladorDisco(8);

    expect(disco.crearArchivo("a.txt", 3)).toBe(true);
    expect(disco.getInodo("a.txt")?.bloques).toEqual([0, 1, 2]); // ?. porque getInodo puede devolver undefined
    expect(disco.bloques.slice(0, 3)).toEqual(["a.txt", "a.txt", "a.txt"]);
  });

  test("rechaza un nombre duplicado", () => {
    const disco = new SimuladorDisco(8);
    disco.crearArchivo("a.txt", 2);

    expect(disco.crearArchivo("a.txt", 1)).toBe(false);
  });

  test("rechaza el archivo si no hay bloques suficientes y no cambia el disco", () => {
    const disco = new SimuladorDisco(4);

    expect(disco.crearArchivo("grande.txt", 5)).toBe(false);
    expect(disco.bloques).toEqual([null, null, null, null]);
  });

  test("rechaza un tamaño de 0 o negativo", () => {
    const disco = new SimuladorDisco(4);

    expect(disco.crearArchivo("a.txt", 0)).toBe(false);
    expect(disco.crearArchivo("b.txt", -1)).toBe(false);
    expect(disco.bloques).toEqual([null, null, null, null]);
  });
});

describe("eliminarArchivo", () => {
  test("libera los bloques del archivo y borra su inodo", () => {
    const disco = new SimuladorDisco(4);
    disco.crearArchivo("a.txt", 3);

    expect(disco.eliminarArchivo("a.txt")).toBe(true);
    expect(disco.bloques).toEqual([null, null, null, null]);
    expect(disco.getInodo("a.txt")).toBeUndefined();
  });

  test("avisa si el archivo no existe", () => {
    const disco = new SimuladorDisco(4);

    expect(disco.eliminarArchivo("fantasma.txt")).toBe(false);
  });

  test("reutiliza bloques libres aunque estén separados", () => {
    const disco = new SimuladorDisco(6);
    disco.crearArchivo("a.txt", 2); // bloques 0 y 1
    disco.crearArchivo("b.txt", 2); // bloques 2 y 3
    disco.eliminarArchivo("a.txt"); // quedan libres 0, 1, 4 y 5

    expect(disco.crearArchivo("c.txt", 3)).toBe(true);
    expect(disco.getInodo("c.txt")?.bloques).toEqual([0, 1, 4]); // no hace falta que estén seguidos
  });
});

describe("generarMapa", () => {
  test("muestra O para ocupados y L para libres", () => {
    const disco = new SimuladorDisco(4);
    disco.crearArchivo("a.txt", 2);

    expect(disco.generarMapa()).toBe("[O][O][L][L]");
  });
});

describe("generarTablaInodos", () => {
  test("muestra cada archivo con su tamaño y sus bloques ", () => {
    const disco = new SimuladorDisco(6);
    disco.crearArchivo("a.txt", 2); // bloques 0 y 1
    disco.crearArchivo("b.txt", 3); // bloques 2, 3 y 4

    expect(disco.generarTablaInodos()).toBe(
      "a.txt | 2 bloques | [0, 1]\nb.txt | 3 bloques | [2, 3, 4]"
    );
  });

  test("muestra un mensaje si no hay archivos", () => {
    const disco = new SimuladorDisco(4);

    expect(disco.generarTablaInodos()).toBe("No hay archivos en el disco.");
  });
});

describe("métricas", () => {
  test("calcula los bloques totales, ocupados y libres", () => {
    const disco = new SimuladorDisco(8);
    disco.crearArchivo("a.txt", 3);

    expect(disco.bloquesOcupados).toBe(3);
    expect(disco.bloquesLibres).toBe(5);
  });

  test("calcula el porcentaje de ocupación", () => {
    const disco = new SimuladorDisco(8);
    disco.crearArchivo("a.txt", 2);
    disco.crearArchivo("b.txt", 2);

    expect(disco.porcentajeOcupacion).toBe(50);
  });
});
