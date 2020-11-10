import { dir } from 'console';

export type SortDirection = 'asc' | 'desc';
export interface Sort<T extends object = object> {
  field: keyof T;
  direction?: SortDirection;
}

export function getOppositeSortDirection(direction: SortDirection | undefined): SortDirection {
  if (!direction || direction === 'desc') {
    return 'asc';
  }

  return 'desc';
}

export function sortDirectionToNumber(direction: SortDirection | undefined): number {
  if (direction === 'desc') {
    return -1;
  }

  return 1;
}
