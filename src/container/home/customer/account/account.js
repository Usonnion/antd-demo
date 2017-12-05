import React, { PureComponent } from 'react';
import AccountPanel from './AccountPanel';
import AccountChangedRecord from './AccountChangedRecord';

class Account extends PureComponent {
  render() {
    return (
      <div>
        <AccountPanel />
        <AccountChangedRecord />
      </div>
    )
  }
}

export default Account;
