import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Skills } from '../../models/skills.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './skills-modal.component.html',
  styleUrl: './skills-modal.component.css',
})
export class SkillsModalComponent {
  @Input() isSkillModalOpen!: boolean;
  @Input() skill!: Skills;
  @Input() mode!: string;

  @Output() toggleSkillModal = new EventEmitter();
  @Output() onSkillSave = new EventEmitter<Skills>();

  closeModal() {
    this.toggleSkillModal.emit();
  }

  saveNewSkill() {
    this.onSkillSave.emit(this.skill);
  }
}
