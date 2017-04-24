import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as cssModules from 'react-css-modules';

import { AppState } from 'state';
import { getPassengerIds } from 'state/selectors';
import { passengerAdded, passengerMoved } from 'state/actions'

import PassengerColumn from './PassengerColumn';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const styles = require('./PassengerGrid.css');

const headerLabels = ['first name', 'last name', 'age', 'price'];

interface PassengerGridStateProps {
  passengerIds: string[];
}

interface PassengerGridDispatchProps {
  onPassengerAdded(): void;
  onPassengerMoved(dragIndex: number, hoverIndex: number): void;
}

const component = ({ passengerIds, onPassengerAdded, onPassengerMoved }: PassengerGridStateProps & PassengerGridDispatchProps) => (
  <div styleName="passenger-grid">
    <div styleName="headers">
      <div styleName="header"></div>
      {headerLabels.map((label, index) => <div styleName="header" key={index}>{label}</div>)}
    </div>
    {
      passengerIds.map((passengerId, index) =>
        <PassengerColumn id={passengerId} key={index} index={index}
          onPassengerColMoved={onPassengerMoved}></PassengerColumn>
      )
    }
    <div styleName="action-header" onClick={onPassengerAdded}>+</div>
  </div>
);
const styledComponent = cssModules(component, styles);

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(styledComponent));

function mapStateToProps(state: AppState): PassengerGridStateProps {
  return {
    passengerIds: getPassengerIds(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): PassengerGridDispatchProps {
  return {
    onPassengerAdded() {
      dispatch(passengerAdded());
    },
    onPassengerMoved(dragIndex, hoverIndex) {
      dispatch(passengerMoved(dragIndex, hoverIndex));

    }
  }
}
