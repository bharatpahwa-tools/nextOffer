import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SetupModalComponent } from '../../shared/setup-modal/setup-modal.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { JobsComponent } from '../jobs/jobs.component';
import { SkillsComponent } from '../skills/skills.component';

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
  activetab: string = 'dashboard';
  isSetupModalOpen: boolean = false;
  supabaseUrl: string = localStorage.getItem('supabaseUrl') || '';
  supabaseKey: string = localStorage.getItem('supabaseKey') || '';
  isSupabaseReady: boolean = false;

  constructor(private supabaseService: SupabaseService) {
    this.supabaseService.isReady$.subscribe((ready) => {
      this.isSupabaseReady = ready;
      if (!ready) {
        this.isSetupModalOpen = true;
      }
    });
    this.checkInitialConnection();
  }

  async checkInitialConnection() {
    if (this.supabaseUrl && this.supabaseKey) {
      const isConnected = await this.supabaseService.testConnection(
        this.supabaseUrl,
        this.supabaseKey,
      );
      console.log(isConnected);
      if (isConnected) {
        this.supabaseService.initialize(this.supabaseUrl, this.supabaseKey);
        this.isSetupModalOpen = false;
      } else {
        this.isSetupModalOpen = true;
      }
    } else {
      this.isSetupModalOpen = true;
    }
  }

  toggleSetupModal() {
    this.isSetupModalOpen = !this.isSetupModalOpen;
  }

  getActiveTab(tab: string) {
    this.activetab = tab;
    console.log(this.activetab);
  }

  async onSupabaseUrlChange(url: string) {
    this.supabaseUrl = url;
    console.log(url);
    localStorage.setItem('supabaseUrl', url);
  }

  async onSupabaseKeyChange(key: string) {
    this.supabaseKey = key;
    console.log(key);
    localStorage.setItem('supabaseKey', key);
    this.supabaseService.initialize(this.supabaseUrl, this.supabaseKey);
  }
}
