import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TimelineConfig } from '../../models/timeline.model';
import { Jobs } from '../../models/jobs.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;
  private readonly TABLE_NAME = 'timeline_config';
  readonly JOBS_TABLE = 'jobs';
  readonly SKILLS_TABLE = 'skills';

  constructor() {}

  initialize(supabaseUrl: string, supabaseKey: string) {
    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  // Jobs Methods

  async getJobs(): Promise<Jobs[]> {
    if (!this.supabase) return [];

    const { data, error } = await this.supabase
      .from(this.JOBS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      companyName: row.company_name,
      jobLink: row.job_link,
      notes: row.notes,
      position: row.position,
      deadline: row.deadline,
      email: row.email,
      status: { status: row.status },
    }));
  }

  async saveJob(job: Jobs): Promise<any> {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const payload = {
      company_name: job.companyName,
      job_link: job.jobLink,
      notes: job.notes,
      position: job.position,
      deadline: job.deadline,
      email: job.email,
      status: job.status.status, // Extracting string from Status object
    };

    let result;
    if (job.id) {
      result = await this.supabase
        .from(this.JOBS_TABLE)
        .update(payload)
        .eq('id', job.id)
        .select();
    } else {
      result = await this.supabase
        .from(this.JOBS_TABLE)
        .insert(payload)
        .select();
    }

    const { data, error } = result;
    if (error) {
      console.error('Error saving job:', error);
      throw error;
    }
    return data;
  }

  async deleteJob(id: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const { error } = await this.supabase
      .from(this.JOBS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  // Skills Methods

  async getSkills(): Promise<import('../../models/skills.model').Skills[]> {
    if (!this.supabase) return [];

    const { data, error } = await this.supabase
      .from(this.SKILLS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      skillIcon: row.skill_icon,
    }));
  }

  async saveSkill(
    skill: import('../../models/skills.model').Skills,
  ): Promise<any> {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const payload = {
      name: skill.name,
      skill_icon: skill.skillIcon,
    };

    let result;
    if (skill.id) {
      result = await this.supabase
        .from(this.SKILLS_TABLE)
        .update(payload)
        .eq('id', skill.id)
        .select();
    } else {
      result = await this.supabase
        .from(this.SKILLS_TABLE)
        .insert(payload)
        .select();
    }

    const { data, error } = result;
    if (error) {
      console.error('Error saving skill:', error);
      throw error;
    }
    return data;
  }

  async deleteSkill(id: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const { error } = await this.supabase
      .from(this.SKILLS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  }

  // Topics Methods
  readonly TOPICS_TABLE = 'topics';

  async getTopics(
    skillId: string,
  ): Promise<import('../../models/topics.model').Topic[]> {
    if (!this.supabase) return [];

    const { data, error } = await this.supabase
      .from(this.TOPICS_TABLE)
      .select('*')
      .eq('skill_id', skillId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      skillId: row.skill_id,
      title: row.title,
      difficulty: row.difficulty,
      priority: row.priority,
      link: row.link,
      notes: row.notes,
      createdAt: row.created_at,
      revisionsCompleted: row.revisions_completed,
      frequency: row.frequency,
      references: row.references_list,
      companies: row.companies,
    }));
  }

  async saveTopic(
    topic: import('../../models/topics.model').Topic,
  ): Promise<any> {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const payload = {
      skill_id: topic.skillId,
      title: topic.title,
      difficulty: topic.difficulty,
      priority: topic.priority,
      link: topic.link,
      notes: topic.notes,
      revisions_completed: topic.revisionsCompleted,
      frequency: topic.frequency,
      references_list: topic.references,
      companies: topic.companies,
    };

    let result;
    if (topic.id) {
      result = await this.supabase
        .from(this.TOPICS_TABLE)
        .update(payload)
        .eq('id', topic.id)
        .select();
    } else {
      result = await this.supabase
        .from(this.TOPICS_TABLE)
        .insert(payload)
        .select();
    }

    const { data, error } = result;
    if (error) {
      console.error('Error saving topic:', error);
      throw error;
    }
    return data;
  }

  async deleteTopic(id: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase client not initialized');

    const { error } = await this.supabase
      .from(this.TOPICS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting topic:', error);
      throw error;
    }
  }

  async saveTimelineConfig(config: TimelineConfig): Promise<any> {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized');
    }

    let result;

    if (config.id) {
      const { id, ...updatePayload } = config;

      result = await this.supabase
        .from(this.TABLE_NAME)
        .update(updatePayload)
        .eq('id', id)
        .select();
    } else {
      // Insert new
      result = await this.supabase
        .from(this.TABLE_NAME)
        .insert(config)
        .select();
    }

    const { data, error } = result;

    if (error) {
      console.error('Error saving timeline config:', error);
      throw error;
    }
    return data;
  }

  async getTimelineConfig(): Promise<TimelineConfig | null> {
    if (!this.supabase) {
      return null;
    }

    const { data, error } = await this.supabase
      .from(this.TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false }) // Get the latest one
      .limit(1)
      .single();

    if (error) {
      // It's okay if no data found
      if (error.code !== 'PGRST116') {
        console.error('Error fetching timeline config:', error);
      }
      return null;
    }

    return data as TimelineConfig;
  }
}
