export class Ciudad {
  public nombreCiudad: string;
  public publicoFotoCiudad: string;
  public privadoFotoCiudad: string;
  public estadoCiudad: number;
  public base64Ciudad: string;

  constructor(
    nom: string,
    pub: string,
    pri: string,
    est: number,
    base: string
  ) {
    this.nombreCiudad = nom;
    this.publicoFotoCiudad = pub;
    this.privadoFotoCiudad = pri;
    this.estadoCiudad = est;
    this.base64Ciudad = base;
  }
}
