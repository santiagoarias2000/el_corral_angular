import { ProductoService } from 'src/app/servicios/producto.service';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { Producto } from 'src/app/modelos/productos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';

@Component({
  selector: 'app-producto-admin',
  templateUrl: './producto-admin.component.html',
  styleUrls: ['./producto-admin.component.css'],
})
export class ProductoAdminComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arregloProductos: Producto[];
  public productoSelect: Producto;
  public subscription: Subscription;

  //para hacer una modal toca tener 4 variables obligatirias
  public modalRef: BsModalRef;

  public tmpBase64: any;
  constructor(
    private productoService: ProductoService,
    public miMensaje: ToastrService,
    public miModal: BsModalService
  ) {
    this.arregloProductos = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
    this.productoSelect = new Producto('', '', '', 0, '', '', '');
    this.tmpBase64 = null;
    //iniciar variables para usar las modales...
    this.modalRef = this.tmpBase64;
  }

  ngOnInit(): void {
    this.obtenerProductoadmin();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public obtenerProductoadmin(): void {
    this.subscription = this.productoService
      .obtenerProductos()
      .pipe(
        map((respuesta: any) => {
          console.log(respuesta);
          this.arregloProductos = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public borrarProductico(objBorrar: string): void {
    if (objBorrar != null) {
      this.subscription = this.productoService
        .eleminarProductos(objBorrar)
        .subscribe(() => {
          this.arregloProductos = this.arregloProductos.filter(
            (produc) => produc.codProducto !== objBorrar
          );
        });
      mostrarMensaje(
        'success',
        'Se elemino con éxito',
        'Eliminado',
        this.miMensaje
      );
    } else {
      mostrarMensaje('error', 'No se borro con exito', 'Error', this.miMensaje);
    }
  }

}
