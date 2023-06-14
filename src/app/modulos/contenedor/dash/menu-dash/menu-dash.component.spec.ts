import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashComponent } from './menu-dash.component';

describe('MenuDashComponent', () => {
  let component: MenuDashComponent;
  let fixture: ComponentFixture<MenuDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
