import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceShipmentComponent } from './incidence-shipment.component';

describe('IncidenceShipmentComponent', () => {
  let component: IncidenceShipmentComponent;
  let fixture: ComponentFixture<IncidenceShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenceShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenceShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
