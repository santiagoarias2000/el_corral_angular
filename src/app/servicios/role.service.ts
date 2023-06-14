import { Injectable } from '@angular/core';
import * as miUrl from '../utilidades/dominios/uris';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../modelos/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public apiRole: string = miUrl.API_ROLE;
  constructor(private http: HttpClient) {}

  public obtenerRoles(): Observable<Role[]> {
    const url = this.apiRole + '/all'
    return this.http.get<Role[]>(url);
  }

  public crearRoles(objNuevoRole: Role): Observable<Role>{
    const url = this.apiRole + '/add'
    return this.http.post<Role>(url, objNuevoRole);
  }
}
