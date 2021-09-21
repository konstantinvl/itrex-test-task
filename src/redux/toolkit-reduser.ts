import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EMAIL,
  FIRST_NAME,
  ID,
  LAST_NAME,
  onPage,
  PHONE,
  STATE,
} from '../components/constants';
import { PersonInt, SortInt, StateInt } from '../interfaces/stateInt';
import axiosInstance from '../services/api';
import { filterInfo } from '../services/functions';

export const initialState: StateInt = {
  info: [],
  totalPages: 0,
  activePage: 1,
  sort: { name: '', order: 1 },
  activeStateFilter: 'None',
  states: [],
  searchValue: '',
  activeInfo: [],
};

export const getInfo = createAsyncThunk('info/setInfo', async (): Promise<
  PersonInt[]
> => {
  const response = await axiosInstance('react-test-api.json');
  const info: PersonInt[] = response.data;

  return info;
});

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      const { info, activePage, searchValue, activeStateFilter } = state;
      const { name } = <SortInt>state.sort;
      let { order } = <SortInt>state.sort;
      switch (action.payload) {
        case ID: {
          if (name === ID) {
            order = -order;
          } else {
            order = 1;
          }
          info.sort((profileA, profileB) => {
            if (profileA.id > profileB.id) {
              return 1 * order;
            }
            if (profileA.id < profileB.id) {
              return -1 * order;
            }
            return 0;
          });
          break;
        }
        case FIRST_NAME: {
          if (name === FIRST_NAME) {
            order = -order;
          } else {
            order = 1;
          }
          info.sort((profileA, profileB) => {
            if (profileA.firstName > profileB.firstName) {
              return 1 * order;
            }
            if (profileA.firstName < profileB.firstName) {
              return -1 * order;
            }
            return 0;
          });
          break;
        }
        case LAST_NAME: {
          if (name === LAST_NAME) {
            order = -order;
          } else {
            order = 1;
          }
          info.sort((profileA, profileB) => {
            if (profileA.lastName > profileB.lastName) {
              return 1 * order;
            }
            if (profileA.lastName < profileB.lastName) {
              return -1 * order;
            }
            return 0;
          });
          break;
        }
        case EMAIL: {
          if (name === EMAIL) {
            order = -order;
          } else {
            order = 1;
          }
          info.sort((profileA, profileB) => {
            if (profileA.email > profileB.email) {
              return 1 * order;
            }
            if (profileA.email < profileB.email) {
              return -1 * order;
            }
            return 0;
          });
          break;
        }
        case PHONE: {
          if (name === PHONE) {
            order = -order;
          } else {
            order = 1;
          }
          info.sort((profileA, profileB) => {
            if (profileA.phone > profileB.phone) {
              return 1 * order;
            }
            if (profileA.phone < profileB.phone) {
              return -1 * order;
            }
            return 0;
          });
          break;
        }
        case STATE: {
          if (name === STATE) {
            order = -order;
          } else {
            order = 1;
          }
          info.sort((profileA, profileB) => {
            if (profileA.adress.state > profileB.adress.state) {
              return 1 * order;
            }
            if (profileA.adress.state < profileB.adress.state) {
              return -1 * order;
            }
            return 0;
          });
          break;
        }
        default:
          break;
      }

      const filteredInfo = filterInfo(info, searchValue, activeStateFilter);

      const activeInfo = filteredInfo.filter(
        (_item, id) => id >= (activePage - 1) * onPage && id <= activePage * onPage - 1
      );
      state.info = info;
      state.activeInfo = activeInfo;
      state.sort = { name: action.payload, order };
    },

    setActiveDescription: (state, action: PayloadAction<PersonInt>) => {
      return { ...state, activeDescription: action.payload };
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      const { info, searchValue, activeStateFilter } = state;

      const filteredInfo = filterInfo(info, searchValue, activeStateFilter);

      const activeInfo = filteredInfo.filter(
        (_item, id) =>
          id >= (action.payload - 1) * onPage && id <= action.payload * onPage - 1
      );
      return { ...state, activePage: action.payload, activeInfo };
    },
    setStateFilter: (state, action: PayloadAction<string>) => {
      const { info, searchValue } = state;
      const filteredInfo = filterInfo(info, searchValue, action.payload);
      const totalPages = Math.ceil(Number(filteredInfo.length) / onPage);
      const activeInfo = filteredInfo.filter((_item, id) => id >= 0 && id <= onPage - 1);
      return {
        ...state,
        totalPages,
        activeStateFilter: action.payload,
        activePage: 1,
        activeInfo,
      };
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      const { info, activeStateFilter } = state;
      const filteredInfo = filterInfo(info, action.payload, activeStateFilter);
      const totalPages = Math.ceil(Number(filteredInfo.length) / onPage);
      const activeInfo = filteredInfo.filter((_item, id) => id >= 0 && id <= onPage - 1);
      return {
        ...state,
        totalPages,
        searchValue: action.payload,
        activePage: 1,
        activeInfo,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInfo.fulfilled, (state, action): StateInt => {
      if (action.payload) {
        const totalPages = Math.ceil(Number(action.payload.length) / onPage);
        const activeInfo: PersonInt[] = action.payload.filter(
          (_item, id) => id >= 0 && id <= onPage - 1
        );
        const states: string[] = ['None'];
        action.payload.forEach((profile) => {
          if (!states.includes(profile.adress.state)) {
            states.push(profile.adress.state);
          }
        });
        return {
          ...state,
          info: action.payload,
          totalPages,
          activeInfo,
          states,
        };
      }
      return { ...state, info: [] };
    });
  },
});

export default infoSlice.reducer;
