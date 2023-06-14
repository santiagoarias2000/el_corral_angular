import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoActualizarConImagenComponent } from './producto-actualizar-con-imagen.component';

describe('ProductoActualizarConImagenComponent', () => {
  let component: ProductoActualizarConImagenComponent;
  let fixture: ComponentFixture<ProductoActualizarConImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoActualizarConImagenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoActualizarConImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
