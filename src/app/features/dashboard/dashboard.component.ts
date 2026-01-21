import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SetupModalComponent } from '../../shared/setup-modal/setup-modal.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { JobsComponent } from '../jobs/jobs.component';
import { SkillsComponent } from '../skills/skills.component';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterModule,
    SetupModalComponent,
    TimelineComponent,
    JobsComponent,
    SkillsComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  activetab: string = 'timeline';
  isSetupModalOpen: boolean = false;
  supabaseUrl: string = localStorage.getItem('supabaseUrl') || '';
  supabaseKey: string = localStorage.getItem('supabaseKey') || '';

  constructor(private supabaseService: SupabaseService) {
    this.supabaseService.initialize(this.supabaseUrl, this.supabaseKey);
  }

  toggleSetupModal() {
    this.isSetupModalOpen = !this.isSetupModalOpen;
  }

  getActiveTab(tab: string) {
    this.activetab = tab;
    console.log(this.activetab);
  }

  onSupabaseUrlChange(url: string) {
    this.supabaseUrl = url;
    localStorage.setItem('supabaseUrl', url);
    this.supabaseService.initialize(this.supabaseUrl, this.supabaseKey);
  }

  onSupabaseKeyChange(key: string) {
    localStorage.setItem('supabaseKey', key);
    this.supabaseKey = key;
    this.supabaseService.initialize(this.supabaseUrl, this.supabaseKey);
  }
}
