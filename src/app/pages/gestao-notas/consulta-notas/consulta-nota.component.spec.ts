import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNotaComponent } from './consulta-nota.component';

describe('ConsultaAutuacaoComponent', () => {
  let component: ConsultaNotaComponent;
  let fixture: ComponentFixture<ConsultaNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
