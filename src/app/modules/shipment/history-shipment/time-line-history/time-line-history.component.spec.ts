import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineHistoryComponent } from './time-line-history.component';

describe('TimeLineHistoryComponent', () => {
  let component: TimeLineHistoryComponent;
  let fixture: ComponentFixture<TimeLineHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLineHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLineHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
