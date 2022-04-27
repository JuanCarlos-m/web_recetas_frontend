import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEntryComponent } from './receta-entry.component';

describe('RecetaEntryComponent', () => {
  let component: RecetaEntryComponent;
  let fixture: ComponentFixture<RecetaEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
