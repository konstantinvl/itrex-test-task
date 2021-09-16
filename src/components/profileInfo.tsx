import React, { FC } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import { useAppSelector } from '../redux/store';
import '../assets/profileInfo.scss';

export const ProfileInfo: FC = () => {
  const { activeDescription } = useAppSelector((state) => state.info);
  const lorem = new LoremIpsum();
  return (
    <div
      className="profile-info"
      style={activeDescription ? { visibility: 'visible' } : { visibility: 'collapse' }}
    >
      <h5>Profile Info:</h5>
      <span>
        Selected Profile:{' '}
        {`${activeDescription?.firstName} ${activeDescription?.lastName}`}
      </span>
      <span>
        Description: <span style={{ fontSize: '0.9em' }}>{lorem.generateWords(32)}</span>
      </span>
      <span>Address: {activeDescription?.adress.streetAddress}</span>
      <span>City: {activeDescription?.adress.city}</span>
      <span>State: {activeDescription?.adress.state}</span>
      <span>Index: {activeDescription?.adress.zip}</span>
    </div>
  );
};
