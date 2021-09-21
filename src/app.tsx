import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './redux/store';
// getStateFilteredInfo
import { getInfo } from './redux/toolkit-reduser';
import { Page } from './components/pageselector';
import { PersonInfo } from './components/personInfo';
import { setActivepage, setSearchValue, setStateFilter } from './redux/actions';
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
            id="search"
            onChange={(e) => {
              dispatch(setSearchValue(e.target.value));
            }}
          />
        </div>
        <div>
          <label htmlFor="state-select">Filter by state: </label>
          <select
            name="state"
            id="state-select"
            value={activeStateFilter}
            onChange={(e) => {
              dispatch(setStateFilter(e.target.value));
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
        {activeInfo?.length > 0 ? (
          activeInfo?.map((person) => {
            return <PersonInfo person={person} key={person.id + person.firstName} />;
          })
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>No information found</div>
        )}
      </div>
      <div className="pagecounter">
        <button
          className="page-selector"
          style={
            totalPages > 0
              ? { width: '2.5vw', visibility: 'visible' }
              : { width: '2.5vw', visibility: 'hidden' }
          }
          disabled={activePage === 1}
          onClick={() => {
            dispatch(setActivepage(activePage - 1));
          }}
        >
          Prev
        </button>
        {setPageSelector()}
        <button
          className="page-selector"
          style={
            totalPages > 0
              ? { width: '2.5vw', visibility: 'visible' }
              : { width: '2.5vw', visibility: 'collapse' }
          }
          disabled={activePage === totalPages}
          onClick={() => {
            dispatch(setActivepage(activePage + 1));
          }}
        >
          Next
        </button>
      </div>

      <ProfileInfo />
    </div>
  );
}
