import { Ciudad } from './ciudad';

export class Restaurante {
  public nombreRestaurante: string;
  public direccionRestaurante: string;
  public telefonoRestaurante: string;
  public horarioRestaurante: string;
  public detalleRestaurante: string;
  public estadoRestaurante: number;
  public codCiudad: Ciudad;

  constructor(
    nom: string,
    dir: string,
    tel: string,
    hor: string,
    des: string,
    est: number,
    codC: Ciudad
  ) {
    this.nombreRestaurante = nom;
    this.direccionRestaurante = dir;
    this.telefonoRestaurante = tel;
    this.horarioRestaurante = hor;
    this.detalleRestaurante = des;
    this.estadoRestaurante = est;
    this.codCiudad = codC;
  }
}
