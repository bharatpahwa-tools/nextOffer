import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Jobs } from '../../models/jobs.model';

@Component({
  selector: 'app-jobs-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './jobs-modal.component.html',
  styleUrl: './jobs-modal.component.css',
})
export class JobsModalComponent {
  @Input() currentJob!: Jobs;
  @Input() mode!: 'new' | 'edit';
  @Output() saveNewJob = new EventEmitter<Jobs>();
  @Output() toggleJobsModal = new EventEmitter();

  closeModal() {
    this.toggleJobsModal.emit();
  }

  saveNewJobDetails() {
    this.saveNewJob.emit(this.currentJob);
  }
}
