import { Subscription, finalize, map } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ciudad } from 'src/app/modelos/ciudad';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css'],
})
export class CiudadComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arregloCiudades: Ciudad[];
  public subscription: Subscription;

  constructor(private ciudadService: CiudadService) {
    this.arregloCiudades = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
  }

  
  ngOnInit(): void {
    this.obtenerCiudades();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public obtenerCiudades(): void {
    this.subscription = this.ciudadService
      .obtenerCiudades()
      .pipe(
        map((respuesta: any) => {
          console.log(respuesta);
          this.arregloCiudades = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
