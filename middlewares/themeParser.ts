import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import app from '../app';
import { ThemeCookie } from '../constants';
import { Theme } from '../models/theme';

export function themeParser() {
  return (request: Request<ParamsDictionary, any, any, { theme?: Theme }>, response: Response, next: NextFunction) => {
    const cookieTheme = request.cookies[ThemeCookie] as Theme | undefined;
    const theme = request.query.theme || cookieTheme || 'light';
    response.cookie(ThemeCookie, theme);

    app.locals.theme = theme;
    next();
  };
}
