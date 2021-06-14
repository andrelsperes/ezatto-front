import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAnexoComponent } from './visualizar-anexo.component';

describe('VisualizarAnexoComponent', () => {
  let component: VisualizarAnexoComponent;
  let fixture: ComponentFixture<VisualizarAnexoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarAnexoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
