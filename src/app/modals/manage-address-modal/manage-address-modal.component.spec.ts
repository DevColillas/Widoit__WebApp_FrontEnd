import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressModalComponent } from './manage-address-modal.component';

describe('ManageAddressModalComponent', () => {
  let component: ManageAddressModalComponent;
  let fixture: ComponentFixture<ManageAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAddressModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
