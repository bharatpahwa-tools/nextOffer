import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jobs } from '../../models/jobs.model';
import { JobsModalComponent } from '../../shared/jobs-modal/jobs-modal.component';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    JobsModalComponent,
    FormsModule,
    ConfirmationModalComponent,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  constructor(private supbaseService: SupabaseService) {}
  isAddNewJobModalOpen: boolean = false;
  jobs!: Jobs[];
  isConfirmationModalOpen: boolean = false;
  confirmationType: string = 'delete';
  assetId!: string;
  mode: 'new' | 'edit' = 'new';

  async ngOnInit() {
    await this.loadJobs();
  }

  async loadJobs() {
    const jobs = await this.supbaseService.getJobs();
    if (jobs) {
      this.jobs = jobs;
    }
  }

  getJobLink(url: string): string {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  currentJob: Jobs = {
    companyName: '',
    position: '',
    email: '',
    deadline: new Date().toISOString().split('T')[0],
    jobLink: '',
    status: { status: 'new' },
    notes: '',
  };

  toggleJobsModal() {
    this.isAddNewJobModalOpen = !this.isAddNewJobModalOpen;
  }

  addJob() {
    this.mode = 'new';
    this.currentJob = {
      companyName: '',
      position: '',
      deadline: new Date().toISOString().split('T')[0],
      jobLink: '',
      email: '',
      status: { status: 'new' },
      notes: '',
    };

    this.toggleJobsModal();
  }

  editJob(id?: string) {
    if (!id) return;
    this.mode = 'edit';
    const jobToEdit = this.jobs.find((j) => j.id === id);
    if (jobToEdit) {
      // Create a copy to avoid mutating the list item directly
      this.currentJob = JSON.parse(JSON.stringify(jobToEdit));
      this.toggleJobsModal();
    }
  }

  async saveNewJob(job: Jobs) {
    try {
      await this.supbaseService.saveJob(job);
      await this.loadJobs();
      this.toggleJobsModal();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }

  async confirmAction(event: { action: boolean; id: string }) {
    console.log('user confrim', event.action, event.id);
    if (event.action === true) {
      try {
        await this.supbaseService.deleteJob(event.id);
        await this.loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
    this.isConfirmationModalOpen = !this.isConfirmationModalOpen;
  }

  deleteJob(id: any) {
    this.assetId = id;
    this.isConfirmationModalOpen = true;
  }
}
