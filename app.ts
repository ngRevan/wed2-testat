import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
import methodOverride from 'method-override';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import { themeParser } from './middlewares';
import { indexRouter } from './routes/index.router';
import { notesRouter } from './routes/notes.router';
import { registerHbsHelpers } from './utils/handlebars.util';

const app = express();

// view engine setup
app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'hbs');
registerHbsHelpers();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(themeParser());
app.use(methodOverride('_method'));
app.use(
  sassMiddleware({
    src: path.join(path.resolve(), '/'),
    dest: path.join(path.resolve(), 'dist', 'css'),
  })
);
app.use(express.static(path.join(path.resolve(), 'dist', 'css')));

app.use('/', indexRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
