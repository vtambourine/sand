import React from 'react';

import Button from '../components/Button';

export default class extends React.Component {

  render () {
    const { context } = this.props;
    return (
      <div>
        <h1>Destination Finder of {context.company_name}</h1>
        <Button text="Explore"/>
      </div>
    );
  }

}
