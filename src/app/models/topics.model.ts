export interface Topic {
  id?: string;
  skillId: string | undefined;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  link: string;
  notes?: string;
  createdAt?: string;
  revisionsCompleted: number;
  frequency?: number;
  references?: string[];
  companies?: string[];
}
