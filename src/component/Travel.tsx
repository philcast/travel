import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as cssModules from 'react-css-modules';

import { AppState } from 'state';
import { getTravel } from 'state/selectors';
import { departureChanged, destinationChanged, outwardDateChanged, inwardDateChanged } from 'state/actions'

const styles = require('./Travel.css');

const availableCities = [
  'Bordeaux',
  'Grenoble',
  'Lyon',
  'Marseille',
  'Nantes',
  'Paris',
  'Rennes',
  'Strasbourg'
];

interface TravelStateProps {
  departure: string;
  destination: string,
  outwardDate: Date;
  inwardDate?: Date;
  promoCode?: string;
}

interface TravelDispatchProps {
  onDepartureChanged(value: string): void;
  onDestinationChanged(value: string): void;
  onOutwardDateChanged(value: Date): void;
  onInwardDateChanged(value: Date): void;
}

const component = (props: TravelStateProps & TravelDispatchProps) => {
  const outwardDate = props.outwardDate ? props.outwardDate.toLocaleDateString() : '';
  const inwardDate = props.inwardDate ? props.inwardDate.toLocaleDateString() : '';
  return (
    <div styleName="travel">
      <div className="input-group">
        <label className="label">Departure</label>
        <select className="select" value={props.departure}
          onChange={event => props.onDepartureChanged(event.target.value)}>
          {availableCities.map(city => <option key={city}>{city}</option>)}
        </select>
      </div>
      <div className="input-group ml1">
        <label className="label">Destination</label>
        <select className="select" value={props.departure}
          onChange={event => props.onDestinationChanged(event.target.value)}>
          {
            availableCities
              .filter(city => city !== props.departure)
              .map(city => <option key={city}>{city}</option>)
          }
        </select>
      </div>
      <div className="input-group ml1">
        <label className="label">Outward date</label>
        <input type="text" className="input" value={outwardDate}
          onChange={event => props.onOutwardDateChanged(new Date(event.target.value))} />
      </div>
      <div className="input-group ml1">
        <label className="label">Inward date</label>
        <input type="text" className="input" value={inwardDate}
          onChange={event => props.onInwardDateChanged(new Date(event.target.value))} />
      </div>
    </div>
  );
};
const styledComponent = cssModules(component, styles);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);

function mapStateToProps(state: AppState): TravelStateProps {
  const { departure, destination, outwardDate, inwardDate, promoCode } = getTravel(state);
  return {
    departure,
    destination,
    outwardDate,
    inwardDate,
    promoCode
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): TravelDispatchProps {
  return {
    onDepartureChanged(value) {
      dispatch(departureChanged(value));
    },
    onDestinationChanged(value) {
      dispatch(destinationChanged(value));
    },
    onOutwardDateChanged(value) {
      dispatch(outwardDateChanged(value));
    },
    onInwardDateChanged(value) {
      dispatch(inwardDateChanged(value));
    }
  }
}
