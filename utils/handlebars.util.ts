import hbs from 'hbs';

import { formatDate } from './format-date.helper';
import { times } from './times.helper';

export function registerHbsHelpers() {
  hbs.registerHelper('formatDate', formatDate);
  hbs.registerHelper('times', times);
}
