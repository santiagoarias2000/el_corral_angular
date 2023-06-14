import { Subscription, finalize, map } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Restaurante } from './../../../modelos/restaurante';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { RestauranteService } from 'src/app/servicios/restaurante.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css'],
})
export class RestauranteComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arregloRestaurantes: Restaurante[];
  public subscription: Subscription;

  constructor(private restauranteService: RestauranteService) {
    this.arregloRestaurantes = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerRestaurantes();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public obtenerRestaurantes(): void {
    this.subscription = this.restauranteService
      .obtenerRestaurantes()
      .pipe(
        map((respuesta: any) => {
          console.log(respuesta);
          this.arregloRestaurantes = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
