import React, {Component} from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
  ControlLabel
} from 'react-bootstrap';

class Login extends Component {
  render() {
    return (<div>
      <Form horizontal="horizontal">
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email"/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password"/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>;
    </div>);
  }
}

export default Login;
