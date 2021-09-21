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
      <div className="profile-info_wrapper">
        <div className="profile-info_info">
          <span>
            <h6>Selected Profile:</h6>{' '}
            {`${activeDescription?.firstName} ${activeDescription?.lastName}`}
          </span>

          <span>
            <h6>Address:</h6> {activeDescription?.adress.streetAddress}
          </span>
          <span>
            <h6>City:</h6> {activeDescription?.adress.city}
          </span>
          <span>
            <h6>State:</h6> {activeDescription?.adress.state}
          </span>
          <span>
            <h6>Index:</h6> {activeDescription?.adress.zip}
          </span>
        </div>
        <div className="profile-info_description">
          <span>
            <h6>Description:</h6>{' '}
            <span style={{ fontSize: '0.9em' }}>{lorem.generateWords(32)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
