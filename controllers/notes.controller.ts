import { NextFunction, Request, Response } from 'express';
import expressValidator from 'express-validator';
import createError from 'http-errors';
import luxon from 'luxon';

import app from '../app';
import { NotesIndexQueryCookie } from '../constants';
import { getOppositeSortDirection, Note, NoteMessages, Sort } from '../models';
import { Theme } from '../models/theme';
import { notesStore } from '../services/notes.store';

function getIndexQueryCookie(request: NoteMessages.NotesIndexRequest): NoteMessages.NotesIndexQuery | undefined {
  const cookie = request.cookies[NotesIndexQueryCookie];
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch {
      return undefined;
    }
  }

  return undefined;
}

function getIndexQuery(request: NoteMessages.NotesIndexRequest): NoteMessages.NotesIndexQuery {
  const cookieQuery = getIndexQueryCookie(request);
  return {
    ...cookieQuery,
    ...request.query,
  };
}

export async function showIndex(request: NoteMessages.NotesIndexRequest, response: Response) {
  const query = getIndexQuery(request);
  const sort: Sort<Note> | undefined = !!query.sortField
    ? { field: query.sortField, direction: query.sortDirection }
    : undefined;
  const showFinished = query.showFinished == null ? true : query.showFinished === 'true';
  const notes = await notesStore.find(showFinished, sort);
  response.cookie(NotesIndexQueryCookie, JSON.stringify(query));

  const isLightTheme = (app.locals.theme as Theme) === 'light';

  const sortButtons: { text: string; field: keyof Note }[] = [
    { text: 'By due Date', field: 'dueAt' },
    { text: 'By created Date', field: 'createdAt' },
    { text: 'By Priority', field: 'priority' },
  ];

  response.render('notes/index', {
    title: 'Notes Manager',
    notes,
    themeButton: {
      theme: isLightTheme ? 'dark' : 'light',
      text: isLightTheme ? 'Switch to dark' : 'Switch to light',
    },
    sortButtons: sortButtons.map((sortButton) => {
      const isActive = query.sortField === sortButton.field;
      const direction = isActive ? getOppositeSortDirection(query.sortDirection) : 'asc';

      return {
        ...sortButton,
        active: isActive ? 'active' : '',
        direction,
      };
    }),
    showFinishedButton: {
      value: !showFinished,
      text: showFinished === false ? 'Show All' : 'Hide Finished',
    },
  });
}

export function showCreate(_request: Request, response: Response) {
  response.render('notes/create', {
    title: 'Create Note',
    today: luxon.DateTime.local().toISODate(),
  });
}

export async function createNote(request: NoteMessages.CreateNoteRequest, response: Response, next: NextFunction) {
  const errors = expressValidator.validationResult(request);
  if (!errors.isEmpty()) {
    return next(createError(400, 'One or more validation errors occured'));
  }

  await notesStore.insert(request.body);
  response.redirect('/notes');
}

export async function showEdit(request: NoteMessages.ShowEditRequest, response: Response) {
  const note = await notesStore.findById(request.params.id);

  response.render('notes/edit', {
    title: 'Edit Note',
    note,
  });
}

export async function updateNote(request: NoteMessages.UpdateNoteRequest, response: Response, next: NextFunction) {
  const errors = expressValidator.validationResult(request);
  if (!errors.isEmpty()) {
    return next(createError(400, 'One or more validation errors occured'));
  }

  await notesStore.update(request.params.id, request.body);
  response.redirect('/notes');
}
