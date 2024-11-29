import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAliasModalComponent } from './manage-alias-modal.component';

describe('ManageAliasModalComponent', () => {
  let component: ManageAliasModalComponent;
  let fixture: ComponentFixture<ManageAliasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAliasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAliasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
