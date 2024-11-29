import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTableConfigComponent } from './dashboard-table-config.component';

describe('DashboardTableConfigComponent', () => {
  let component: DashboardTableConfigComponent;
  let fixture: ComponentFixture<DashboardTableConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTableConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTableConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
