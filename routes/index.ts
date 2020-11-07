import express from 'express';
export const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (_req, res) => {
  res.render('index', { title: 'Note Manager' });
});
