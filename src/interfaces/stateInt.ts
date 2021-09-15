export interface StateInt {
  info: PersonInt[];
  activePage: number;
  totalPages: number;
  sort: SortInt;
  activeInfo?: PersonInt[];
  activeDescription?: PersonInt;
  activeStateFilter: string;
  states: string[];
}

export interface PersonInt {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: AdressInt;
  description: string;
}

export interface AdressInt {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export interface SortInt {
  name: string;
  order: number;
}
// adress: {streetAddress: '6388 Lacus Ct', city: 'Kenora', state: 'IA', zip: '49758'}
// description: "{lorem|32"
// email: "SPaulsen@donec.org"
// firstName: "Anteria"
// id: 655
// lastName: "Slocum"
// phone: "(967)760-0580"
