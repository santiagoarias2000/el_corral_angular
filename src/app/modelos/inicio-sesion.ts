export class InicioSesion {
  public correoAcceso: string;
  public claveAcceso: string;

  constructor(cor: string, cla: string) {
    this.correoAcceso = cor;
    this.claveAcceso = cla;
  }
}
