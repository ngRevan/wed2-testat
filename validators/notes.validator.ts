import expressValidator from 'express-validator';
import luxon from 'luxon';

export const createNoteValidators: expressValidator.ValidationChain[] = [
  expressValidator.body('title').notEmpty().isLength({ max: 50 }).trim().escape(),

  expressValidator.body('description').notEmpty().isLength({ max: 1000 }).trim().escape(),

  expressValidator.body('priority').notEmpty().isInt({ min: 1, max: 5 }),

  expressValidator
    .body('dueAt')
    .notEmpty()
    .isDate()
    .isAfter(luxon.DateTime.local().minus({ days: 1 }).toISODate()),
];

export const updateNoteValidators: expressValidator.ValidationChain[] = [
  expressValidator.body('title').notEmpty().isLength({ max: 50 }).trim().escape(),

  expressValidator.body('description').notEmpty().isLength({ max: 1000 }).trim().escape(),

  expressValidator.body('priority').notEmpty().isInt({ min: 1, max: 5 }),

  expressValidator.body('dueAt').notEmpty().isDate(),

  expressValidator.body('isFinished').isBoolean(),
];
