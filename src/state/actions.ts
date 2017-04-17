import { AgeCategory } from './model';

type Action =
  | DepartureChanged
  | DestinationChanged
  | OutwardDateChanged
  | InwardDateChanged
  | PassengerAdded
  | PassengerRemoved
  | FirstNameChanged
  | LastNameChanged
  | AgeChanged
  ;

export default Action;

export interface DepartureChanged {
  type: 'DEPARTURE_CHANGED';
  departure: string;
}
export interface DestinationChanged {
  type: 'DESTINATION_CHANGED';
  destination: string;
}
export interface OutwardDateChanged {
  type: 'OUTWARD_DATE_CHANGED';
  outwardDate: Date,
}
export interface InwardDateChanged {
  type: 'INWARD_DATE_CHANGED';
  inwardDate: Date;
}
export interface PassengerAdded {
  type: 'PASSENGER_ADDED';
}
export interface PassengerRemoved {
  type: 'PASSENGER_REMOVED';
  passengerId: string;
}
export interface FirstNameChanged {
  type: 'FIRST_NAME_CHANGED';
  passengerId: string;
  firstName: string;
}
export interface LastNameChanged {
  type: 'LAST_NAME_CHANGED';
  passengerId: string;
  lastName: string;
}
export interface AgeChanged {
  type: 'AGE_CHANGED';
  passengerId: string;
  age: AgeCategory;
}

export const departureChanged = (departure: string): DepartureChanged => ({
  type: 'DEPARTURE_CHANGED',
  departure
});

export const destinationChanged = (destination: string): DestinationChanged => ({
  type: 'DESTINATION_CHANGED',
  destination
});

export const outwardDateChanged = (outwardDate: Date): OutwardDateChanged => ({
  type: 'OUTWARD_DATE_CHANGED',
  outwardDate
});

export const inwardDateChanged = (inwardDate: Date): InwardDateChanged => ({
  type: 'INWARD_DATE_CHANGED',
  inwardDate
});

export const passengerAdded = (): PassengerAdded => ({
  type: 'PASSENGER_ADDED'
});

export const passengerRemoved = (passengerId: string): PassengerRemoved => ({
  type: 'PASSENGER_REMOVED',
  passengerId
});

export const firstNameChanged = (passengerId: string, firstName: string): FirstNameChanged => ({
  type: 'FIRST_NAME_CHANGED',
  passengerId,
  firstName
});

export const lastNameChanged = (passengerId: string, lastName: string): LastNameChanged => ({
  type: 'LAST_NAME_CHANGED',
  passengerId,
  lastName
});

export const ageChanged = (passengerId: string, age: AgeCategory): AgeChanged => ({
  type: 'AGE_CHANGED',
  passengerId,
  age
});
