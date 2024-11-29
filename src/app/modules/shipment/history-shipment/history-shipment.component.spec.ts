import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryShipmentComponent } from './history-shipment.component';

describe('HistoryShipmentComponent', () => {
  let component: HistoryShipmentComponent;
  let fixture: ComponentFixture<HistoryShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
