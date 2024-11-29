import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicButtonGroupComponent } from './dynamic-button-group.component';

describe('DynamicButtonGroupComponent', () => {
  let component: DynamicButtonGroupComponent;
  let fixture: ComponentFixture<DynamicButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicButtonGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
