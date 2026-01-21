import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimelineConfig } from '../../models/timeline.model';

@Component({
  selector: 'app-timeline-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timeline-modal.component.html',
  styleUrl: './timeline-modal.component.css',
})
export class TimelineModalComponent {
  @Input() isTimelineModalOpen: boolean = false;
  @Input() timelineConfig!: TimelineConfig;

  @Output() toggleTimelineModal = new EventEmitter();
  @Output() onTimelineConfigChange = new EventEmitter<TimelineConfig>();

  closeModal() {
    this.toggleTimelineModal.emit();
  }

  saveTimelineDetails() {
    this.onTimelineConfigChange.emit(this.timelineConfig);
  }
}
