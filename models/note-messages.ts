import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

import { Note } from './note';
import { Sort, SortDirection } from './sort';

export interface NotesIndexQuery {
  showFinished?: string;
  sortField?: keyof Note;
  sortDirection?: SortDirection;
}

export interface NotesIndexRequest extends Request<ParamsDictionary, any, any, NotesIndexQuery> {}

export interface CreateNoteBody {
  title: string;
  description: string;
  priority: number;
  dueAt: string;
}

export interface CreateNoteRequest extends Request<ParamsDictionary, any, CreateNoteBody, Query> {}

export interface UpdateNoteBody {
  title: string;
  description: string;
  priority: number;
  dueAt: string;
  isFinished?: string;
}

export interface UpdateNoteRequest extends Request<{ id: string }, any, UpdateNoteBody, Query> {}

export interface ShowEditRequest extends Request<{ id: string }, any, any, Query> {}
