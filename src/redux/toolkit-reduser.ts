import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMAIL, FIRST_NAME, ID, LAST_NAME, PHONE } from '../components/constants';
import { PersonInt, SortInt, StateInt } from '../interfaces/stateInt';
import axiosInstance from '../services/api';

const onPage = 20;

export const initialState: StateInt = {
  info: [],
  totalPages: 0,
  activePage: 1,
  sort: { name: '', order: 1 },
  activeStateFilter: 'None',
  states: [],
  searchValue: '',
};

export const getInfo = createAsyncThunk('info/setInfo', async (): Promise<
  PersonInt[]
> => {
  const response = await axiosInstance('react-test-api.json');
  const info: PersonInt[] = response.data;

  return info;
});

export const getStateFilteredInfo = createAsyncThunk(
  'info/setStateFilteredInfo',
  async (
    activeStateFilter: string
  ): Promise<{ info: PersonInt[]; activeStateFilter: string }> => {
    const response = await axiosInstance('react-test-api.json');
    const info: PersonInt[] = response.data;

    const filteredInfo = info.filter(
      (profile) => profile.adress.state === activeStateFilter
    );
    return { info: filteredInfo, activeStateFilter };
  }
);

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      const { info, activePage, searchValue } = state;
      const { name } = <SortInt>state.sort;
      let { order } = <SortInt>state.sort;
      switch (action.payload) {
        case ID: {
          if (name === ID) {
            order = -order;
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
        default:
          break;
      }

      const activeInfo: PersonInt[] = info
        .filter((item) => {
          const containCheck =
            item.id.toString().includes(searchValue.toLowerCase()) ||
            item.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.adress.state.toLowerCase().includes(searchValue.toLowerCase());
          if (containCheck) {
            return item;
          }
          return false;
        })
        .filter((_item, id) => id >= (activePage - 1) * 20 && id <= activePage * 20 - 1);
      state.info = info;
      state.activeInfo = activeInfo;
      state.sort = { name: action.payload, order };
    },

    setActiveDescription: (state, action: PayloadAction<PersonInt>) => {
      return { ...state, activeDescription: action.payload };
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      const { info, searchValue } = state;

      const activeInfo: PersonInt[] = info
        .filter((item) => {
          const containCheck =
            item.id.toString().includes(searchValue.toLowerCase()) ||
            item.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.adress.state.toLowerCase().includes(searchValue.toLowerCase());
          if (containCheck) {
            return item;
          }
          return false;
        })
        .filter(
          (_item, id) => id >= (action.payload - 1) * 20 && id <= action.payload * 20 - 1
        );
      return { ...state, activePage: action.payload, activeInfo };
    },
    setStateFilter: (state, action: PayloadAction<string>) => {
      state.info = state.info.filter(
        (profile) => profile.adress.state === action.payload
      );
      state.activeInfo = state.info.filter((item, id) => id >= 0 && id <= onPage - 1);
      state.activeStateFilter = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      const { info } = state;
      const activeInfo: PersonInt[] = info
        .filter((item) => {
          const containCheck =
            item.id.toString().includes(action.payload.toLowerCase()) ||
            item.firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.email.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.phone.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.adress.state.toLowerCase().includes(action.payload.toLowerCase());
          if (containCheck) {
            return item;
          }
          return false;
        })
        .filter((_item, id) => id >= 0 && id <= onPage - 1);
      return {
        ...state,
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
          totalPages,
          activeInfo,
          states,
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
          totalPages,
          activeInfo,
          activePage: 1,
          activeStateFilter: action.payload.activeStateFilter,
          searchValue: '',
        };
      }
      return { ...state, info: [] };
    });
  },
});

export default infoSlice.reducer;
