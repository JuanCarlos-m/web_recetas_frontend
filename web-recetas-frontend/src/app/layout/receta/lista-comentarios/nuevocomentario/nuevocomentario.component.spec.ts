import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevocomentarioComponent } from './nuevocomentario.component';

describe('NuevocomentarioComponent', () => {
  let component: NuevocomentarioComponent;
  let fixture: ComponentFixture<NuevocomentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevocomentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevocomentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
