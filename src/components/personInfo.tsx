import React, { FC } from 'react';
import { PersonInt } from '../interfaces/stateInt';
import '../assets/personInfo.scss';
import { useAppDispatch } from '../redux/store';
import { setActiveDecription } from '../redux/actions';

export const PersonInfo: FC<{
  person: PersonInt;
}> = ({ person }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="personInfo profile-table"
      onClick={() => dispatch(setActiveDecription(person))}
    >
      <div className="personInfo_id">{person.id}</div>
      <div className="personInfo_name">{person.firstName}</div>
      <div className="personInfo_name">{person.lastName}</div>
      <div className="personInfo_contact">{person.email}</div>
      <div className="personInfo_contact">{person.phone}</div>
      <div className="personInfo_state">{person.adress.state}</div>
    </div>
  );
};
