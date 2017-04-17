import { AppState } from '.';

export const getTravel =
  (state: AppState) => state.travel

export const getPassengerIds =
  (state: AppState) => getTravel(state).passengers;

export const getPassenger =
  (state: AppState, passengerId: string) => state.passengers[passengerId];
