import Action, * as Actions from './actions';
import { AppState, TravelState, PassengerState } from './model';
import * as uuid from 'uuid';

const initialState = (): AppState => {
  const passengerId = uuid.v4();
  return {
    travel: {
      departure: 'Paris',
      destination: 'Grenoble',
      outwardDate: new Date(2017, 5, 10, 9, 0, 0, 0),
      passengers: [passengerId]
    },
    passengers: {
      [passengerId]: {
        firstName: 'John',
        lastName: 'Doe',
        age: 'ADULT',
        price: 100
      }
    }
  };
}

export function reducer(state: AppState = initialState(), action: Action) {
  switch (action.type) {
    case 'DEPARTURE_CHANGED':
      return onDepartureChanged(state, action);
    case 'DESTINATION_CHANGED':
      return onDestinationChanged(state, action);
    case 'OUTWARD_DATE_CHANGED':
      return onOutwardChanged(state, action);
    case 'INWARD_DATE_CHANGED':
      return onInwardChanged(state, action);
    case 'PASSENGER_ADDED':
      return onPassengerAdded(state);
    case 'PASSENGER_REMOVED':
      return onPassengerRemoved(state, action);
    case 'FIRST_NAME_CHANGED':
      return onFirstNameChanged(state, action);
    case 'LAST_NAME_CHANGED':
      return onLastNameChanged(state, action);
    case 'AGE_CHANGED':
      return onAgeChanged(state, action);
    default:
      return state;
  }
};

const onDepartureChanged = (state: AppState, { departure }: Actions.DepartureChanged): AppState =>
  updateTravel(state, { departure });

const onDestinationChanged = (state: AppState, { destination }: Actions.DestinationChanged): AppState =>
  updateTravel(state, { destination });

const onOutwardChanged = (state: AppState, { outwardDate }: Actions.OutwardDateChanged): AppState =>
  updateTravel(state, { outwardDate });

const onInwardChanged = (state: AppState, { inwardDate }: Actions.InwardDateChanged): AppState =>
  updateTravel(state, { inwardDate });

const onPassengerAdded = (state: AppState): AppState => {
  const passengerId = uuid.v4();
  const stateWithUpdatedTravel = updateTravel(state, { passengers: [...state.travel.passengers, passengerId] });
  return {
    ...stateWithUpdatedTravel,
    passengers: {
      ...stateWithUpdatedTravel.passengers,
      [passengerId]: {
        firstName: '',
        lastName: '',
        age: 'ADULT',
        price: 100
      }
    }
  };
};

const onPassengerRemoved = (state: AppState, { passengerId }: Actions.PassengerRemoved): AppState => {
  const currentPassengerIds = state.travel.passengers;
  const newPassengerIds = currentPassengerIds.splice(currentPassengerIds.indexOf(passengerId), 1);

  const { [passengerId]: PassengerState, ...newPassengersMap } = state.passengers;

  return {
    ...state,
    travel: {
      ...state.travel,
      passengers: newPassengerIds
    },
    passengers: newPassengersMap
  };
};


const onFirstNameChanged = (state: AppState, { passengerId, firstName }: Actions.FirstNameChanged): AppState =>
  updatePassenger(state, passengerId, { firstName });

const onLastNameChanged = (state: AppState, { passengerId, lastName }: Actions.LastNameChanged): AppState =>
  updatePassenger(state, passengerId, { lastName });

const onAgeChanged = (state: AppState, { passengerId, age }: Actions.AgeChanged): AppState =>
  updatePassenger(state, passengerId, { age });

function updateTravel(state: AppState, patch: Partial<TravelState>
): AppState {
  return {
    ...state,
    travel: {
      ...state.travel,
      ...patch
    }
  }
}

function updatePassenger(
  state: AppState,
  passengerId: string,
  patch: Partial<PassengerState>
): AppState {
  const passenger = state.passengers[passengerId];
  if (!passenger) {
    return state;
  }
  return {
    ...state,
    passengers: {
      ...state.passengers,
      [passengerId]: {
        ...passenger,
        ...patch
      }
    }
  }
}
