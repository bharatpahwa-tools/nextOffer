import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModalComponent } from '../../shared/timeline-modal/timeline-modal.component';
import { SupabaseService } from '../../core/services/supabase.service';
import { DayStatus, TimelineConfig } from '../../models/timeline.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineModalComponent, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements OnInit {
  isTimelineModalOpen = false;

  timelineConfig: TimelineConfig = {
    duration: 3,
    title: '',
    type: 'months',
    startDate: new Date().toISOString().split('T')[0],
  };

  daysArray: DayStatus[] = [];
  daysLeft = 0;
  endDate!: Date;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    const config = await this.supabaseService.getTimelineConfig();
    if (config) {
      this.timelineConfig = config;
      this.calculateTimeline();
    }
  }

  async onTimelineConfigChange(config: TimelineConfig) {
    console.log(this.timelineConfig);
    await this.supabaseService.saveTimelineConfig(config);
    this.timelineConfig = config;
    this.calculateTimeline();
    this.isTimelineModalOpen = !this.isTimelineModalOpen;
  }

  calculateTimeline() {
    if (!this.timelineConfig.startDate || !this.timelineConfig.duration) return;

    const start = new Date(this.timelineConfig.startDate);
    start.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const end = new Date(start);

    if (this.timelineConfig.type === 'months') {
      end.setMonth(start.getMonth() + this.timelineConfig.duration);
    } else {
      end.setDate(start.getDate() + this.timelineConfig.duration);
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round((end.getTime() - start.getTime()) / oneDay);

    let daysPassed = Math.round((today.getTime() - start.getTime()) / oneDay);

    // Clamp daysPassed between 0 and totalDays
    daysPassed = Math.max(0, Math.min(daysPassed, totalDays));

    this.daysLeft = Math.max(0, totalDays - daysPassed);
    this.endDate = end;

    this.daysArray = Array.from({ length: totalDays }, (_, i) => {
      if (i < daysPassed) return { status: 'passed' };
      if (i === daysPassed) return { status: 'today' };
      return { status: 'future' };
    });
  }

  async toggleTimelineModal() {
    const config = await this.supabaseService.getTimelineConfig();
    if (config) {
      this.timelineConfig = config;
      this.calculateTimeline();
    }
    this.isTimelineModalOpen = !this.isTimelineModalOpen;
  }
}
