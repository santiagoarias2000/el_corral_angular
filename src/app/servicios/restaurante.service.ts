import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as miUrl from '../utilidades/dominios/uris';
import { Restaurante } from '../modelos/restaurante';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  public apiRestaurante: string = miUrl.API_RESTAURANTE;

  constructor(private http: HttpClient) {}

  public obtenerRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.apiRestaurante + '/all');
  }
}
