import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexesShipmentComponent } from './annexes-shipment.component';

describe('AnnexesShipmentComponent', () => {
  let component: AnnexesShipmentComponent;
  let fixture: ComponentFixture<AnnexesShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnexesShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnexesShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
