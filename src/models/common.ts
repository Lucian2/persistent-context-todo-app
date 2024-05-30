export enum Priority {
  Low = 'Low priority',
  Middle = 'Middle priority',
  High = ' High priority',
}

export enum TodoFilter {
  All = 'All',
  Completed = 'Completed',
  Pending = 'Pending',
}

export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
}
