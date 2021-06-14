import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAutuacaoComponent } from './consulta-autuacao.component';

describe('ConsultaAutuacaoComponent', () => {
  let component: ConsultaAutuacaoComponent;
  let fixture: ComponentFixture<ConsultaAutuacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAutuacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAutuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
