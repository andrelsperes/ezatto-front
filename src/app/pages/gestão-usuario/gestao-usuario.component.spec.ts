import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoUsuarioComponent } from './gestao-usuario.component';

describe('GestaoUsuarioComponent', () => {
  let component: GestaoUsuarioComponent;
  let fixture: ComponentFixture<GestaoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
