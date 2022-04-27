import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasUsuarioComponent } from './recetas-usuario.component';

describe('RecetasUsuarioComponent', () => {
  let component: RecetasUsuarioComponent;
  let fixture: ComponentFixture<RecetasUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetasUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
