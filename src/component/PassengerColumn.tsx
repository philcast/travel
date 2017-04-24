import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as cssModules from 'react-css-modules';

import { DragSource, DropTarget, DragSourceSpec, DragSourceMonitor, DragSourceConnector, DropTargetSpec, ConnectDragSource, ConnectDropTarget } from 'react-dnd';

import { AppState, AgeCategory } from 'state';
import { getTravel, getPassenger } from 'state/selectors';
import { firstNameChanged, lastNameChanged, ageChanged } from 'state/actions'
import { findDOMNode } from "react-dom";

const styles = require('./PassengerColumn.css');

const availableAges: AgeCategory[] = [
  'SENIOR',
  'ADULT',
  'YOUTH'
];

////////// DND //////////

const passengerSource: DragSourceSpec<PassengerProps> = {
  beginDrag(props) {
    // return the data describing the dragged item
    return {
      id: props.id,
      index: props.index
    };
  }
}

const passengerTarget: DropTargetSpec<PassengerProps> = {
  hover(props, monitor, component) {
    const dragIndex = (monitor.getItem() as any).index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // Time to actually perform the action
    props.onPassengerColMoved(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    (monitor.getItem() as any).index = hoverIndex;
  }
}

interface PassengerDragProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
}

/////////////////////////

type PassengerProps = PassengerDragProps & PassengerColumnOwnProps & PassengerColumnStateProps & PassengerColumnDispatchProps;

interface PassengerColumnOwnProps {
  id: string;
  index: number;
  onPassengerColMoved(dragIndex: number, hoverIndex: number): void;
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

const component = (props: PassengerProps) => {
  const { connectDragSource, connectDropTarget, isDragging } = props;
  const opacity = isDragging ? 0 : 1;
  return connectDragSource(connectDropTarget(
    <div styleName="passenger-column" style={{ opacity }}>
      <div styleName="passenger-column-header">Passenger {props.index + 1}</div>
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
  ));
};
const styledComponent = cssModules(component, styles);

const draggableComponent = DropTarget('passenger', passengerTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource('passenger', passengerSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(styledComponent));

export default connect(mapStateToProps, mapDispatchToProps)(draggableComponent);

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
