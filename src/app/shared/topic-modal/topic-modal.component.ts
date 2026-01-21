import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Topic } from '../../models/topics.model';

@Component({
  selector: 'app-topic-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topic-modal.component.html',
  styleUrl: './topic-modal.component.css',
})
export class TopicModalComponent {
  @Input() currentTopic!: Topic;
  @Input() mode!: 'new' | 'edit';
  @Output() saveTopicDetails = new EventEmitter<Topic>();
  @Output() toggleTopicModal = new EventEmitter();

  companyInput: string = '';
  referenceInput: string = '';

  addCompany(event: any) {
    if (event.key === 'Enter' || event.type === 'blur') {
      const value = this.companyInput.trim();
      if (value) {
        if (!this.currentTopic.companies) {
          this.currentTopic.companies = [];
        }
        if (!this.currentTopic.companies.includes(value)) {
          this.currentTopic.companies.push(value);
        }
        this.companyInput = '';
      }
      event.preventDefault();
    }
  }

  removeCompany(index: number) {
    this.currentTopic.companies?.splice(index, 1);
  }

  addReference(event: any) {
    if (event.key === 'Enter' || event.type === 'blur') {
      const value = this.referenceInput.trim();
      if (value) {
        if (!this.currentTopic.references) {
          this.currentTopic.references = [];
        }
        if (!this.currentTopic.references.includes(value)) {
          this.currentTopic.references.push(value);
        }
        this.referenceInput = '';
      }
      event.preventDefault();
    }
  }

  removeReference(index: number) {
    this.currentTopic.references?.splice(index, 1);
  }

  closeModal() {
    this.toggleTopicModal.emit();
  }

  saveTopic() {
    this.saveTopicDetails.emit(this.currentTopic);
    console.log(this.currentTopic);
  }
}
