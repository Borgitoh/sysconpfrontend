import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelasModalComponent } from './parcelas-modal.component';

describe('ParcelasModalComponent', () => {
  let component: ParcelasModalComponent;
  let fixture: ComponentFixture<ParcelasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelasModalComponent]
    });
    fixture = TestBed.createComponent(ParcelasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
