import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAutuacaoAgenteComponent } from './relatorio-autuacao-agente.component';

describe('RelatorioAutuacaoAgenteComponent', () => {
  let component: RelatorioAutuacaoAgenteComponent;
  let fixture: ComponentFixture<RelatorioAutuacaoAgenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAutuacaoAgenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAutuacaoAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
