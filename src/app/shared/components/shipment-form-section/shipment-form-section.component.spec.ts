import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentFormSectionComponent } from './shipment-form-section.component';

describe('ShipmentFormSectionComponent', () => {
  let component: ShipmentFormSectionComponent;
  let fixture: ComponentFixture<ShipmentFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentFormSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
