import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesShipmentComponent } from './routes-shipment.component';

describe('RoutesShipmentComponent', () => {
  let component: RoutesShipmentComponent;
  let fixture: ComponentFixture<RoutesShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
