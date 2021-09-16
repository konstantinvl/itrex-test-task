import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './redux/store';

import { getInfo, getStateFilteredInfo } from './redux/toolkit-reduser';
import { Page } from './components/pageselector';
import { PersonInfo } from './components/personInfo';
import { setActivepage, setSearchValue } from './redux/actions';
import { ProfileInfo } from './components/profileInfo';
import { InfoHeader } from './components/infoHeader';

export function App(): JSX.Element {
  const { totalPages, activeInfo, activePage, states, activeStateFilter, searchValue } =
    useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getInfo());
  }, []);

  function setPageSelector() {
    const selectors: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      selectors.push(<Page page={i} key={i} />);
    }
    return selectors;
  }

  return (
    <div className="app">
      <div className="searchpanel">
        <div>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              dispatch(setSearchValue(e.target.value));
            }}
          />
        </div>
        <div>
          <label htmlFor="state">Filter by state: </label>
          <select
            name="state"
            id="state-select"
            value={activeStateFilter}
            onChange={(e) => {
              if (e.target.value === 'None') {
                dispatch(getInfo());
              } else {
                dispatch(getStateFilteredInfo(e.target.value));
              }
            }}
          >
            {states.map((state) => {
              return (
                <option value={state} key={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="info">
        <InfoHeader />
        {activeInfo?.map((person) => {
          return <PersonInfo person={person} key={person.id + person.firstName} />;
        })}
      </div>
      <div className="pagecounter">
        <div
          className="page-selector"
          style={{ width: '2vw' }}
          onClick={() => {
            if (activePage !== 1) {
              dispatch(setActivepage(activePage - 1));
            }
          }}
        >
          Prev
        </div>
        {setPageSelector()}
        <div
          className="page-selector"
          style={{ width: '2vw' }}
          onClick={() => {
            if (activePage !== totalPages) {
              dispatch(setActivepage(activePage + 1));
            }
          }}
        >
          Next
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
}
