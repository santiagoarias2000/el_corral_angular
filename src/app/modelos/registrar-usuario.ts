export class RegistrarUsuario {
  public nombresUsuario: string;
  public apellidosUsuario: string;
  public correoAcceso: string;
  public claveAcceso: string;
  public reclaveAcceso: string;

  constructor(cor: string, cla: string, rec: string, nom: string, ape: string) {
    this.correoAcceso = cor;
    this.claveAcceso = cla;
    this.reclaveAcceso = rec;
    this.nombresUsuario = nom;
    this.apellidosUsuario = ape;
  }
}
