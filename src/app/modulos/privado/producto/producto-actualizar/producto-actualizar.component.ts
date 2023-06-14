import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/productos';
import { ProductoService } from 'src/app/servicios/producto.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-producto-actualizar',
  templateUrl: './producto-actualizar.component.html',
  styleUrls: ['./producto-actualizar.component.css'],
})
export class ProductoActualizarComponent {
  public codPro: string;
  private tmp: any;
  public objProducto: Producto;
  public miSuscripcion: Subscription;
  public arregloProducto: Producto[];
  public cargaFinalizada: boolean;

  public tmpBase64: any;


  constructor(
    private router: Router,
    public crearProducto: ProductoService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.codPro = "";
    this.cargaFinalizada = false;
    this.objProducto = new Producto('', '', '', 0, '', '', '');
    this.miSuscripcion = this.tmp;
    this.arregloProducto = [];

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.codPro = String(params.get('codProducto'));
      if (this.codPro) {
        this.crearProducto.buscarOneProductos(this.codPro).subscribe(
          (res) => {
            this.objProducto = res;
          },
          (err) => {
            console.error(err);
          }
        )
      }
    })
  }
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
      .actualizarProductos(nuevoProducto)
      .pipe(
        map((resultado) => {
          mostrarMensaje('success', 'Producto actualizado', 'Actualizado', this.toastr);
          this.router.navigate(['/private/product/listproduct'])
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'error al actualizar el producto',
            'Error',
            this.toastr
          );
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
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
  public obtenerOne(codProducto: string): void {
    this.miSuscripcion = this.crearProducto
      .buscarOneProductos(codProducto)
      .pipe(
        map((respuesta: any) => {
          console.log(respuesta);
          this.arregloProducto = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
