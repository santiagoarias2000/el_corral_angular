import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/productos';
import { ProductoService } from 'src/app/servicios/producto.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arregloProductos: Producto[];
  public subscription: Subscription;

  constructor(private productoService: ProductoService) {
    this.arregloProductos = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerProducto();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public obtenerProducto(): void {
    this.subscription = this.productoService
      .obtenerProductos()
      .pipe(map((respuesta: any) => {
        console.log(respuesta);
        this.arregloProductos = respuesta;
      }),
      finalize(()=>{
        this.cargaFinalizada = true;
      })
      )
      .subscribe(observadorAny);
  }
}
