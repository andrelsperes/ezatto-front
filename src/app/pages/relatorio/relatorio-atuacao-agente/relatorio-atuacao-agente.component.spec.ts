import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAtuacaoAgenteComponent } from './relatorio-atuacao-agente.component';

describe('RelatorioAtuacaoAgenteComponent', () => {
  let component: RelatorioAtuacaoAgenteComponent;
  let fixture: ComponentFixture<RelatorioAtuacaoAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAtuacaoAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAtuacaoAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
