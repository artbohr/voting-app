import React from 'react';

class Footer extends React.Component {
  render() {
    return (<div className="container footer">
      <div className="row">
        <hr/>
          <div className="col-lg-12">
            <div className="col-md-8">
              Footer Content
            </div>
            <div className="col-md-4">
              <p className="muted pull-right">© 2018 VotingApp. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default Footer;
