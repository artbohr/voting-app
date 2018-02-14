import React from 'react';
import { Panel } from 'react-bootstrap';

class Footer extends React.Component {
  render () {
    return (
      <Panel className="footer">
        <Panel.Footer className="footer">Voting App, 2018</Panel.Footer>
      </Panel>
    )
  }
}

export default Footer;
