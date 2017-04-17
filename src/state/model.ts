
interface Travel {
  departure: string;
  destination: string,
  outwardDate: Date;
  inwardDate?: Date;
  promoCode?: string;
  passengers: string[];
}
export type TravelState = Readonly<Travel>;

interface Passenger {
  firstName: string;
  lastName: string;
  age: AgeCategory;
  price: number;
}
export type PassengerState = Readonly<Passenger>;

export type PassengerKey = keyof PassengerState;

export type StateMap<T> = { [id: string]: T };

export type AppState = {
  travel: TravelState;
  passengers: StateMap<PassengerState>;
}

export type AgeCategory = 'SENIOR' | 'ADULT' | 'YOUTH';
