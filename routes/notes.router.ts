import express from 'express';
import expressValidator from 'express-validator';
import luxon from 'luxon';

import * as notesController from '../controllers/notes.controller';
import { NotesValidator } from '../validators';

export const notesRouter = express.Router();

/* GET create page. */
notesRouter.get('/', notesController.showIndex);
notesRouter.post('/', NotesValidator.createNoteValidators, notesController.createNote);
notesRouter.put('/:id', notesController.updateNote);
notesRouter.get('/create', notesController.showCreate);
notesRouter.get('/edit/:id', notesController.showEdit);
