import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverShipmentComponent } from './driver-shipment.component';

describe('DriverShipmentComponent', () => {
  let component: DriverShipmentComponent;
  let fixture: ComponentFixture<DriverShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
