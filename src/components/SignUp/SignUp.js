import React, { Component } from 'react';
import { Input } from './../../common/Input';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import './SignUp.scss';

const REGISTER = gql`
  mutation Register($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
    signup(data: {
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      password: $password
    }) {
      token
    }
  }
`;

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPass: ''
    };
  }

  handleInput = e => {
    const { id, value } = e.target;

    this.setState({ [id]: value });
  }

  handleSubmit = (e, signup) => {
    e.preventDefault();

    if (this.state.password === this.state.confirmPass) {
      signup({ variables: { ...this.state } });
    } else {
      alert('Passwrod no match');
    }
  }

  catchData = data => {
    const { token } = data.signup;
    localStorage.setItem('netflixToken', token);
    this.props.history.push('/');
  }

  catchError = error => {
    console.log(error);
    alert('Valio barriga hay un error');
  }

  renderForm() {
    return (
      <div className="container SignUp">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s6 input-field">
                <Input id="first_name" name="First Name" type="text" value={this.props.first_name}
                  setInput={this.handleInput} required />
              </div>
              <div className="col s6 input-field">
                <Input id="last_name" name="Last Name" type="text" value={this.props.last_name}
                  setInput={this.handleInput} required />
              </div>
            </div>
            <div className="row">
              <div className="col s12 input-field">
                <Input id="email" name="Email" type="email" value={this.props.email}
                  setInput={this.handleInput} required />
              </div>
              <div className="col s12 input-field">
                <Input id="password" name="Password" type="password" value={this.props.password}
                  setInput={this.handleInput} required />
              </div>
              <div className="col s12 input-field">
                <Input id="confirmPass" name="Confirm Password" type="password" value={this.props.email}
                  setInput={this.handleInput} required />
              </div>
            </div>
            <button className="waves-effect waves-light btn btn-primary">Enviar</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Mutation mutation={REGISTER}>
        {
          (signup, { data, error }) => {
            if (data) this.catchData(data);
            if (error) this.catchError(error);

            return(
              <form onSubmit={e => this.handleSubmit(e, signup)}>
                { this.renderForm() }
              </form>
            )
          }
        }
      </Mutation>
    );
  }
}

export default SignUp;
