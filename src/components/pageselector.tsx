import React from 'react';
import { FC } from 'react';
import { setActivepage } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import '../assets/pageSelector.scss';

export const Page: FC<{
  page: number;
}> = ({ page }) => {
  const { activePage } = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();
  return (
    <div
      className={page === activePage ? 'page-selector-active' : 'page-selector'}
      onClick={() => dispatch(setActivepage(page))}
    >
      {page}
    </div>
  );
};
