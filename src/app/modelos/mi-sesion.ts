export class MiSesion {
  public codMiSesion: string;
  public correoMiSesion: string;
  public rolMiSesion: string;
  public ciudadMiSession: string;
  public nombreMiSession: string;
  public apellidosMiSession: string;

  constructor(
    cod: string,
    corr: string,
    rol: string,
    ciu: string,
    nom: string,
    ape: string
  ) {
    this.codMiSesion = cod;
    this.correoMiSesion = corr;
    this.rolMiSesion = rol;
    this.ciudadMiSession = ciu;
    this.nombreMiSession = nom;
    this.apellidosMiSession = ape;
  }
}
