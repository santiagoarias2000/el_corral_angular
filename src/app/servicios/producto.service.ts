import { Injectable } from '@angular/core';
import * as miUrl from '../utilidades/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/productos';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  public apiProducto: string = miUrl.API_PRODUCTOS;

  constructor(private http: HttpClient, private router: Router) {}

  public obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiProducto + '/all');
  }
  public crearProductos(objNuevoProducto: Producto): Observable<Producto> {
    const url = this.apiProducto + '/add';
    return this.http.post<Producto>(url, objNuevoProducto);
  }
  public eleminarProductos(idProducto: string): Observable<Producto> {
    const url = this.apiProducto + '/delete/' + idProducto;
    return this.http.delete<Producto>(url);
  }
  public actualizarProductos(actuProducto: Producto): Observable<Producto> {
    const url = this.apiProducto + '/updateinfo/' + actuProducto;
    return this.http.put<Producto>(url, actuProducto);
  }
  public actualizarImagen(actuProducto: Producto): Observable<Producto> {
    const url = this.apiProducto + '/updatephoto/' + actuProducto;
    return this.http.put<Producto>(url, actuProducto);
  }
  public buscarOneProductos(idProducto: string): Observable<Producto> {
    const url = this.apiProducto + '/one/' + idProducto;
    return this.http.get<Producto>(url);
  }
}
