import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelasComponent } from './parcelas.component';

describe('ParcelasComponent', () => {
  let component: ParcelasComponent;
  let fixture: ComponentFixture<ParcelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParcelasComponent]
    });
    fixture = TestBed.createComponent(ParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
