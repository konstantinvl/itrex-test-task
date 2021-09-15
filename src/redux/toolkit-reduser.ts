import { Action, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMAIL, FIRST_NAME, ID, LAST_NAME, PHONE } from '../components/constants';
import { PersonInt, SortInt, StateInt } from '../interfaces/stateInt';
import axiosInstance from '../services/api';
import { setActiveInfo, setActivepage } from './actions';

import type { RootState } from './store';

const onPage = 20;

export const initialState: StateInt = {
  info: [],
  totalPages: 0,
  activePage: 1,
  sort: { name: '', order: 1 },
  activeStateFilter: 'None',
  states: [],
};

export const getInfo = createAsyncThunk('info/setInfo', async (_id, thunkAPI): Promise<
  PersonInt[]
> => {
  const response = await axiosInstance('react-test-api.json');
  const info: PersonInt[] = response.data;
  thunkAPI.dispatch(setActiveInfo());
  return info;
});

export const getStateFilteredInfo = createAsyncThunk(
  'info/setStateFilteredInfo',
  async (
    activeStateFilter: string,
    thunkAPI
  ): Promise<{ info: PersonInt[]; activeStateFilter: string }> => {
    const response = await axiosInstance('react-test-api.json');
    const info: PersonInt[] = response.data;
    thunkAPI.dispatch(setActiveInfo());
    const filteredInfo = info.filter(
      (profile) => profile.adress.state === activeStateFilter
    );
    return { info: filteredInfo, activeStateFilter: activeStateFilter };
  }
);

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      const { info, activePage } = state;
      let { name, order } = <SortInt>state.sort;
      switch (action.payload) {
        case ID: {
          if (name === ID) {
            order = -1 * order;
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
            order = -1 * order;
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
            order = -1 * order;
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
            order = -1 * order;
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
            order = -1 * order;
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
      }

      const activeInfo: PersonInt[] = info.filter(
        (item, id) => id >= (activePage - 1) * 20 && id <= activePage * 20 - 1
      );
      state.info = info;
      state.activeInfo = activeInfo;
      state.sort = { name: action.payload, order: order };
    },

    setActiveDescription: (state, action: PayloadAction<PersonInt>) => {
      return { ...state, activeDescription: action.payload };
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      const { info } = state;
      const activeInfo: PersonInt[] = info.filter(
        (item, id) => id >= (action.payload - 1) * 20 && id <= action.payload * 20 - 1
      );
      console.log(activeInfo);
      return { ...state, activePage: action.payload, activeInfo: activeInfo };
    },
    setActiveInfo: (state, action: Action) => {
      const { info, activePage } = state;
      const activeInfo: PersonInt[] = info.filter(
        (item, id) => id >= (activePage - 1) * 20 && id <= activePage * 20 - 1
      );
      return { ...state, activeInfo: activeInfo };
    },
    setStateFilter: (state, action: PayloadAction<string>) => {
      state.info = state.info.filter(
        (profile) => profile.adress.state === action.payload
      );
      state.activeInfo = state.info.filter((item, id) => id >= 0 && id <= onPage - 1);
      state.activeStateFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInfo.fulfilled, (state, action): StateInt => {
      if (action.payload) {
        const totalPages = Math.ceil(Number(action.payload.length) / onPage);
        const activeInfo: PersonInt[] = action.payload.filter(
          (item, id) => id >= 0 && id <= onPage - 1
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
          totalPages: totalPages,
          activeInfo: activeInfo,
          states: states,
        };
      }
      return { ...state, info: [] };
    });
    builder.addCase(getStateFilteredInfo.fulfilled, (state, action): StateInt => {
      if (action.payload) {
        const totalPages = Math.ceil(Number(action.payload.info.length) / onPage);
        const activeInfo: PersonInt[] = action.payload.info.filter(
          (item, id) => id >= 0 && id <= onPage - 1
        );

        return {
          ...state,
          info: action.payload.info,
          totalPages: totalPages,
          activeInfo: activeInfo,
          activePage: 1,
          activeStateFilter: action.payload.activeStateFilter,
        };
      }
      return { ...state, info: [] };
    });
  },
});

export default infoSlice.reducer;
