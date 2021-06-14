import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoNotasComponent } from './gestao-notas.component.ts';

describe('GestaoAutuacaoComponent', () => {
  let component: GestaoNotasComponent;
  let fixture: ComponentFixture<GestaoNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
