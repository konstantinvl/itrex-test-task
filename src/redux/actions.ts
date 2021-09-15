import { Action, PayloadAction } from '@reduxjs/toolkit';
import { PersonInt } from '../interfaces/stateInt';

export const SET_ACTIVE_DECRIPTION = 'info/setActiveDescription';
export const SET_ACTIVE_INFO = 'info/setActiveInfo';
export const SET_ACTIVE_PAGE = 'info/setActivePage';
export const SET_SORT = 'info/setSort';
export const SET_STATE_FILTER = 'info/setStateFilter';

export function sortInfo(sort: string): PayloadAction<string> {
  return { type: SET_SORT, payload: sort };
}

export function setActiveDecription(
  activeDescription: PersonInt
): PayloadAction<PersonInt> {
  return { type: SET_ACTIVE_DECRIPTION, payload: activeDescription };
}

export function setActiveInfo(): Action {
  return { type: SET_ACTIVE_INFO };
}

export function setActivepage(page: number): PayloadAction<number> {
  return { type: SET_ACTIVE_PAGE, payload: page };
}

export function setStateFilter(state: string): PayloadAction<string> {
  return { type: SET_STATE_FILTER, payload: state };
}
