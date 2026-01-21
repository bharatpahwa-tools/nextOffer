export interface TimelineConfig {
  id?: number;
  duration: number;
  title: string;
  type: 'days' | 'months';
  startDate: string;
}

export interface DayStatus {
  status: 'passed' | 'future' | 'today';
}
