export class Inodo {
  private _nombre: string;
  private _tamBloques: number;
  private _bloques: number[];    //numeros de los bloques del disco que usa este archivo

  constructor(nombre: string, tamBloques: number) {
    this._nombre = nombre;
    this._tamBloques = tamBloques;
    this._bloques = [];        //arranca vacio, el disco le va avisando que bloques le tocaron
  }

  agregarBloque(indice: number): void {
    this._bloques.push(indice);     //el inodo solo anota el numero, no toca el disco
  }

  get nombre(): string {
    return this._nombre;
  }

  get tamBloques(): number {
    return this._tamBloques;
  }

  get bloques(): number[] {
    return [...this._bloques];       //devuelve una copia
  }
}