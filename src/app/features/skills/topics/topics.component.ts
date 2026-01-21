import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skills } from '../../../models/skills.model';
import { Topic } from '../../../models/topics.model';
import { CommonModule } from '@angular/common';
import { TopicModalComponent } from '../../../shared/topic-modal/topic-modal.component';
import { SupabaseService } from '../../../core/services/supabase.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, TopicModalComponent, ConfirmationModalComponent],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  @Input() currentSkill!: Skills;
  @Output() goBack = new EventEmitter<void>();

  expandedTopicId: string | null = null;
  isTopicModalOpen: boolean = false;
  currentTopic!: Topic;
  topics: Topic[] = [];
  isConfirmationModalOpen: boolean = false;
  confirmationType: string = 'delete';
  assetId!: string;
  mode: 'new' | 'edit' = 'new';

  constructor(private supabaseService: SupabaseService) {}

  openTopicAccordian(topicId: string | undefined) {
    if (!topicId) return;
    this.expandedTopicId = this.expandedTopicId === topicId ? null : topicId;
  }

  async ngOnInit() {
    this.initializeTopic();
    if (this.currentSkill?.id) {
      await this.loadTopics();
    }
  }

  async loadTopics() {
    try {
      this.topics = await this.supabaseService.getTopics(this.currentSkill.id!);
    } catch (error) {
      console.error('Error loading topics:', error);
    }
  }

  initializeTopic() {
    this.currentTopic = {
      skillId: this.currentSkill.id,
      title: '',
      difficulty: 'easy',
      priority: 'P0',
      link: '',
      notes: '',
      revisionsCompleted: 0,
      frequency: 0,
      references: [],
      companies: [],
    };
  }

  viewSkillsSection() {
    this.goBack.emit();
  }

  async saveTopicDetails(topic: Topic) {
    try {
      await this.supabaseService.saveTopic(topic);
      this.toggleTopicModal();
      await this.loadTopics();
      this.initializeTopic();
    } catch (error) {
      console.error('Error saving topic:', error);
    }
  }

  editTopic(topic: Topic) {
    this.mode = 'edit';
    this.currentTopic = { ...topic };
    this.isTopicModalOpen = true;
  }

  async deleteTopic(id: string) {
    this.assetId = id;
    this.isConfirmationModalOpen = true;
  }

  async confirmAction(event: { action: boolean; id: string }) {
    console.log('user confrim', event.action, event.id);
    if (event.action === true) {
      try {
        await this.supabaseService.deleteTopic(event.id);
        await this.loadTopics();
      } catch (error) {
        console.error('Error deleting topic:', error);
      }
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  toggleTopicModal() {
    this.mode = 'new';
    if (!this.isTopicModalOpen) {
      this.initializeTopic();
    }
    this.isTopicModalOpen = !this.isTopicModalOpen;
  }
}
