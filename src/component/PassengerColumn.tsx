import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as cssModules from 'react-css-modules';

import { AppState, AgeCategory } from 'state';
import { getTravel, getPassenger } from 'state/selectors';
import { firstNameChanged, lastNameChanged, ageChanged } from 'state/actions'

const styles = require('./PassengerColumn.css');

const availableAges: AgeCategory[] = [
  'SENIOR',
  'ADULT',
  'YOUTH'
];

interface PassengerColumnOwnProps {
  id: string;
  index: number;
}

interface PassengerColumnStateProps {
  firstName: string;
  lastName: string;
  age: AgeCategory;
  price: number;
}

interface PassengerColumnDispatchProps {
  onFirstNameChanged(value: string): void;
  onLastNameChanged(value: string): void;
  onAgeChanged(value: string): void;
}

const component = (props: PassengerColumnOwnProps & PassengerColumnStateProps & PassengerColumnDispatchProps) => (
  <div styleName="passenger-column">
    <div styleName="passenger-column-header">Passenger {props.index}</div>
    <input type="text" styleName="passenger-cell" className="input" value={props.firstName}
      onChange={event => props.onFirstNameChanged(event.target.value)} />
    <input type="text" styleName="passenger-cell" className="input" value={props.lastName}
      onChange={event => props.onLastNameChanged(event.target.value)} />
    <select styleName="passenger-cell" className="select" value={props.age}
      onChange={event => props.onAgeChanged(event.target.value)}>
      {availableAges.map(age => <option key={age}>{age}</option>)}
    </select>
    <span styleName="passenger-cell" className="bold">{props.price}</span>
  </div>
);
const styledComponent = cssModules(component, styles);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);

function mapStateToProps(state: AppState, { id }: PassengerColumnOwnProps): PassengerColumnStateProps {
  const { firstName, lastName, age, price } = getPassenger(state, id);
  return {
    firstName,
    lastName,
    age,
    price
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>, { id }: PassengerColumnOwnProps): PassengerColumnDispatchProps {
  return {
    onFirstNameChanged(value) {
      dispatch(firstNameChanged(id, value));
    },
    onLastNameChanged(value) {
      dispatch(lastNameChanged(id, value));
    },
    onAgeChanged(value) {
      dispatch(ageChanged(id, value as AgeCategory));
    }
  }
}
