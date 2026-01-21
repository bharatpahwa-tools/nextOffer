import { Component, OnInit } from '@angular/core';
import { Skills } from '../../models/skills.model';
import { CommonModule } from '@angular/common';
import { SkillsModalComponent } from '../../shared/skills-modal/skills-modal.component';
import { SupabaseService } from '../../core/services/supabase.service';
import { TopicsComponent } from './topics/topics.component';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    SkillsModalComponent,
    TopicsComponent,
    ConfirmationModalComponent,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit {
  constructor(private supabaseService: SupabaseService) {}
  isSkillModalOpen: boolean = false;
  showTopics: boolean = false;
  skills: Skills[] = [];
  isConfirmationModalOpen: boolean = false;
  confirmationType: string = 'delete';
  assetId!: string;
  mode: 'new' | 'edit' = 'new';

  skill: Skills = {
    id: '',
    name: '',
    skillIcon: '',
  };
  currentSkill: Skills = {
    id: '',
    name: '',
    skillIcon: '',
  };

  async ngOnInit() {
    await this.loadSkills();
  }

  async loadSkills() {
    this.skills = await this.supabaseService.getSkills();
  }

  async onSkillSave(skill: Skills) {
    try {
      await this.supabaseService.saveSkill(skill);
      await this.loadSkills();
      this.toggleSkillModal();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  }

  viewTopics(skill: Skills) {
    this.showTopics = true;
    this.currentSkill = skill;
  }

  toggleSkillModal() {
    this.isSkillModalOpen = !this.isSkillModalOpen;
    if (!this.isSkillModalOpen) {
      this.skill = { name: '', skillIcon: '' };
    }
  }

  openAddSkillModal() {
    this.skill = { name: '', skillIcon: '' };
    this.mode = 'new';
    this.toggleSkillModal();
  }

  editSkill(skill: Skills) {
    this.skill = { ...skill };
    this.mode = 'edit';
    this.isSkillModalOpen = true;
  }

  async confirmAction(event: { action: boolean; id: string }) {
    console.log('user confrim', event.action, event.id);
    if (event.action === true) {
      try {
        await this.supabaseService.deleteSkill(event.id);
        await this.loadSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  async deleteSkill(id: string) {
    this.assetId = id;
    this.isConfirmationModalOpen = true;
  }
}
