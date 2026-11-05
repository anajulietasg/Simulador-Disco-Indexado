import { Inodo } from "./Inodo";

export class SimuladorDisco {
  private _bloques: (string | null)[];         //mapa del disco: null = libre, texto = nombre del archivo que lo ocupa
  private _tablaInodos: Map<string, Inodo>;    //nombre del archivo -> su inodo

  constructor(totalBloques: number = 64) {
    this._bloques = new Array(totalBloques).fill(null);    //todos los bloques empiezan libres
    this._tablaInodos = new Map();
  }

  crearArchivo(nombre: string, tamBloques: number): boolean {
    if (this._tablaInodos.has(nombre)) {     //nombre duplicado
      console.log(`Error: El archivo '${nombre}' ya existe.`);
      return false;
    }

    if (tamBloques <= 0 ) {     //valida el tamaño 
      console.log("Error: Tamaño de archivo inválido.");
      return false;
    }

    const bloquesLibres = this._bloques
      .map((bloque, indice) => (bloque === null ? indice : -1))    //si esta libre guarda su numero, si no un -1
      .filter((indice) => indice !== -1);       //se queda solo con los numeros libres

    if (bloquesLibres.length < tamBloques) {
      console.log("Error: Espacio en disco insuficiente / Bloques agotados.");
      return false;
    }

    const nuevoInodo = new Inodo(nombre, tamBloques);    //asignación indexada, toma los primeros libres aunque no estén seguidos
    bloquesLibres.slice(0, tamBloques).forEach((indice) => {     //toma solo los que necesita
      this._bloques[indice] = nombre;       //el disco marca el bloque como ocupado
      nuevoInodo.agregarBloque(indice);     //el inodo anota donde quedo
    });

    this._tablaInodos.set(nombre, nuevoInodo);
    console.log(`Archivo '${nombre}' creado con éxito. Bloques asignados: [${nuevoInodo.bloques.join(", ")}]`);
    return true;
  }

  eliminarArchivo(nombre: string): boolean {
    const inodo = this._tablaInodos.get(nombre);    //busca el inodo por nombre en la tabla
    if (inodo === undefined) {
      console.log(`Error: Archivo '${nombre}' no encontrado.`);
      return false;
    }

    inodo.bloques.forEach((indice) => (this._bloques[indice] = null));     //el inodo le dice al disco qué bloques liberar
    this._tablaInodos.delete(nombre);
    console.log(`Archivo '${nombre}' eliminado correctamente.`);
    return true;
  }

  generarMapa(): string {
    return this._bloques.map((bloque) => (bloque === null ? "[L]" : "[O]")).join("");   //cada bloque se vuelve [L] o [O] y se pegan
  }

  generarTablaInodos(): string {
    if (this._tablaInodos.size === 0) {
      return "No hay archivos en el disco.";
    }
    return [...this._tablaInodos.values()]
      .map((inodo) => `${inodo.nombre} | ${inodo.tamBloques} bloques | [${inodo.bloques.join(", ")}]`)
      .join("\n");
  }

  mostrarMapa(): void {
    console.log("\nMapa del Disco:", this.generarMapa());
  }

  mostrarTablaInodos(): void {
    console.log("\nTabla de Inodos:", this.generarTablaInodos());
  }

  get bloques(): (string | null)[] {
    return [...this._bloques];      //copia del mapa, solo lectura
  }

  get bloquesTotales(): number {
    return this._bloques.length;
  }

  get bloquesLibres(): number {
    return this._bloques.filter((bloque) => bloque === null).length;
  }

  get bloquesOcupados(): number {
    return this._bloques.filter((bloque) => bloque !== null).length;
  }

  get porcentajeOcupacion(): number {
    return (this.bloquesOcupados / this.bloquesTotales) * 100;
  }

  get mayorHuecoContiguo(): number {
    let actual = 0;
    let mayor = 0;

    this._bloques.forEach((bloque) => {
      if (bloque === null) {
        actual++;
        if (actual > mayor) {
          mayor = actual;
        }
      } else {
        actual = 0;
      }
    });
    return mayor;
  }

  get fragmentacionExterna(): number {
    if (this.bloquesLibres === 0) {     //si no hay libres devuelve 0 para no dividir por 0
      return 0;
    }
    return (1 - this.mayorHuecoContiguo / this.bloquesLibres) * 100;
  }

  buscarInodo(nombre: string): Inodo | undefined {
    return this._tablaInodos.get(nombre);    //metodo, devuelve undefined si no existe
  }
}