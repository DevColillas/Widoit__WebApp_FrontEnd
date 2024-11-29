import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShipmentComponent } from './product-shipment.component';

describe('ProductShipmentComponent', () => {
  let component: ProductShipmentComponent;
  let fixture: ComponentFixture<ProductShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
