import React, { FC } from 'react';
import { sortInfo } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { EMAIL, FIRST_NAME, ID, LAST_NAME, PHONE, STATE } from './constants';

export const InfoHeader: FC = () => {
  const { sort } = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();

  return (
    <div className="personInfo">
      <div
        className="personInfo_id"
        onClick={() => {
          dispatch(sortInfo(ID));
        }}
      >
        id{' '}
        <span
          style={
            sort.name === ID
              ? { visibility: 'visible', transform: `rotate(${90 * -1 * sort.order}deg)` }
              : { visibility: 'collapse' }
          }
        >
          ᐅ
        </span>
      </div>
      <div
        className="personInfo_name"
        onClick={() => {
          dispatch(sortInfo(FIRST_NAME));
        }}
      >
        First Name{' '}
        <span
          style={
            sort.name === FIRST_NAME
              ? { visibility: 'visible', transform: `rotate(${90 * -1 * sort.order}deg)` }
              : { visibility: 'collapse' }
          }
        >
          ᐅ
        </span>
      </div>
      <div
        className="personInfo_name"
        onClick={() => {
          dispatch(sortInfo(LAST_NAME));
        }}
      >
        Last Name{' '}
        <span
          style={
            sort.name === LAST_NAME
              ? { visibility: 'visible', transform: `rotate(${90 * -1 * sort.order}deg)` }
              : { visibility: 'collapse' }
          }
        >
          ᐅ
        </span>
      </div>
      <div
        className="personInfo_contact"
        onClick={() => {
          dispatch(sortInfo(EMAIL));
        }}
      >
        Email{' '}
        <span
          style={
            sort.name === EMAIL
              ? { visibility: 'visible', transform: `rotate(${90 * -1 * sort.order}deg)` }
              : { visibility: 'collapse' }
          }
        >
          ᐅ
        </span>
      </div>
      <div
        className="personInfo_contact"
        onClick={() => {
          dispatch(sortInfo(PHONE));
        }}
      >
        Phone{' '}
        <span
          style={
            sort.name === PHONE
              ? { visibility: 'visible', transform: `rotate(${90 * -1 * sort.order}deg)` }
              : { visibility: 'collapse' }
          }
        >
          ᐅ
        </span>
      </div>
      <div
        className="personInfo_state"
        onClick={() => {
          dispatch(sortInfo(STATE));
        }}
      >
        State{' '}
        <span
          style={
            sort.name === STATE
              ? { visibility: 'visible', transform: `rotate(${90 * -1 * sort.order}deg)` }
              : { visibility: 'collapse' }
          }
        >
          ᐅ
        </span>
      </div>
    </div>
  );
};
