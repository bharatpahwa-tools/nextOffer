import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineModalComponent } from './timeline-modal.component';

describe('TimelineModalComponent', () => {
  let component: TimelineModalComponent;
  let fixture: ComponentFixture<TimelineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineModalComponent);
    component = fixture.componentInstance;
    component.timelineConfig = {
      duration: 100,
      title: 'Test',
      type: 'days',
      startDate: new Date().toISOString(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
