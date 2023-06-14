import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Producto } from 'src/app/modelos/productos';
import { ProductoService } from 'src/app/servicios/producto.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css'],
})
export class ProductoCrearComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objProducto: Producto;
  public miSuscripcion: Subscription;

  public tmpBase64: any;

  constructor(
    private router: Router,
    public crearProducto: ProductoService,
    public toastr: ToastrService
  ) {
    this.objProducto = new Producto('', '', '', 0, '', '', '');
    this.miSuscripcion = this.tmp;
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public operacion(formulario: NgForm): void {
    const nuevoProducto = new Producto(
      this.objProducto.codProducto,
      this.objProducto.nombreProducto,
      this.objProducto.detalleProducto,
      this.objProducto.valorProducto,
      this.objProducto.publicoFotoProducto,
      this.objProducto.privadoFotoProducto,
      this.objProducto.base64Producto
    );

    this.miSuscripcion = this.crearProducto
      .crearProductos(nuevoProducto)
      .pipe(map((resultado) => {
        mostrarMensaje('success', 'Producto Creado', 'Correcto', this.toastr );
        return resultado;
      }), catchError((err)=>{
        mostrarMensaje('error', 'error al crear producto', 'Error', this.toastr);
        formulario.reset();
        throw err;
      })
      ).subscribe(observadorAny)
      ;
    }
    public seleccionarFoto(caja: any): void {
      if (!caja.target.files[0] || caja.target.files[0].length == 0) {
        return;
      }
      const tipo = caja.target.files[0].type;
      if (tipo.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(caja.target.files[0]);
      reader.onload = () => {
        this.tmpBase64 = reader.result;
        this.objProducto.base64Producto = this.tmpBase64;
        this.objProducto.publicoFotoProducto = caja.target.files[0].name;
      };
    }
    
}
