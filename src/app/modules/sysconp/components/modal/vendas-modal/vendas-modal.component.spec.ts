import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasModalComponent } from './vendas-modal.component';

describe('VendasModalComponent', () => {
  let component: VendasModalComponent;
  let fixture: ComponentFixture<VendasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendasModalComponent]
    });
    fixture = TestBed.createComponent(VendasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
