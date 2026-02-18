
export interface LogEntry {
  timestamp: string;
  message: string;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export type TaskCategory = 'Bugs' | 'Features' | 'Maintenance' | 'Other';
