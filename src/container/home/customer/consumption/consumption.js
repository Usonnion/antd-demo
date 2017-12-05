import React, { PureComponent } from 'react';
import ReservationRecord from './ReservationRecord'
import OrderRecord from './OrderRecord';

class Consumption extends PureComponent {
  render() {
    return (
      <div>
        <ReservationRecord />
        <OrderRecord />
      </div>
    )
  }
}

export default Consumption;
