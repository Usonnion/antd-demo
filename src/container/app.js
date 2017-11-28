import React, { PureComponent } from 'react';
import CustomRoute from '../components/customRoute';

class App extends PureComponent {

  render() {
    return (
      <div>
        <CustomRoute {...this.props} />
      </div>
    );
  }
}

export default App;
