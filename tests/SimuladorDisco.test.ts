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
});