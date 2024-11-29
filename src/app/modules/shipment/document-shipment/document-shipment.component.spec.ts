import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentShipmentComponent } from './document-shipment.component';

describe('DocumentShipmentComponent', () => {
  let component: DocumentShipmentComponent;
  let fixture: ComponentFixture<DocumentShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
