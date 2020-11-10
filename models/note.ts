export interface Note {
  _id: string;
  title: string;
  description: string;
  priority: number;
  dueAt: string;
  isFinished: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
}
