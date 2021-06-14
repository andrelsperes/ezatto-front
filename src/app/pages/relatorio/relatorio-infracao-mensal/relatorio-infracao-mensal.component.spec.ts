import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioInfracaoMensalComponent } from './relatorio-infracao-mensal.component';

describe('RelatorioInfracaoMensalComponent', () => {
  let component: RelatorioInfracaoMensalComponent;
  let fixture: ComponentFixture<RelatorioInfracaoMensalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioInfracaoMensalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioInfracaoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
