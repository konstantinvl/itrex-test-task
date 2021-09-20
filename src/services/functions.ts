import { PersonInt } from '../interfaces/stateInt';

export function filterInfo(
  info: PersonInt[],
  searchFilter: string,
  stateFilter: string
): PersonInt[] {
  return info
    .filter((item) => {
      const containCheck =
        item.id.toString().includes(searchFilter.toLowerCase()) ||
        item.firstName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.adress.state.toLowerCase().includes(searchFilter.toLowerCase());
      if (containCheck) {
        return item;
      }
      return false;
    })
    .filter((item) => {
      if (stateFilter === 'None') {
        return true;
      }
      return item.adress.state === stateFilter;
    });
}
