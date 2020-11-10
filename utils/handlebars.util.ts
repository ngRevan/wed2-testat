import hbs from 'hbs';
import { formatDate } from './format-date.helper';
import { ifEquals } from './if-equals.helper';

export function registerHbsHelpers() {
  hbs.registerHelper('formatDate', formatDate);
  hbs.registerHelper('ifEquals', ifEquals);
}
