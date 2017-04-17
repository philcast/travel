import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as cssModules from 'react-css-modules';

import { AppState } from 'state';
import { getPassengerIds } from 'state/selectors';
import { passengerAdded } from 'state/actions'

import PassengerColumn from './PassengerColumn';

const styles = require('./PassengerGrid.css');

const headerLabels = ['first name', 'last name', 'age', 'price'];

interface PassengerGridStateProps {
  passengerIds: string[];
}

interface PassengerGridDispatchProps {
  onPassengerAdded(): void;
}

const component = ({ passengerIds, onPassengerAdded }: PassengerGridStateProps & PassengerGridDispatchProps) => (
  <div styleName="passenger-grid">
    <div styleName="headers">
      <div styleName="header"></div>
      {headerLabels.map((label, index) => <div styleName="header" key={index}>{label}</div>)}
    </div>
    {
      passengerIds.map((passengerId, index) =>
        <PassengerColumn id={passengerId} key={index} index={index + 1}></PassengerColumn>
      )
    }
    <div styleName="action-header" onClick={onPassengerAdded}>+</div>
  </div>
);
const styledComponent = cssModules(component, styles);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);

function mapStateToProps(state: AppState): PassengerGridStateProps {
  return {
    passengerIds: getPassengerIds(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): PassengerGridDispatchProps {
  return {
    onPassengerAdded() {
      dispatch(passengerAdded());
    }
  }
}
