import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCorrenteComponent } from './conta-corrente.component';

describe('ContaCorrenteComponent', () => {
  let component: ContaCorrenteComponent;
  let fixture: ComponentFixture<ContaCorrenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContaCorrenteComponent]
    });
    fixture = TestBed.createComponent(ContaCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
