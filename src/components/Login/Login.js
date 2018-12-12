import React, { Component } from 'react';
import { Input } from './../../common/Input';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleInput = e => {
    const { id, value } = e.target;

    this.setState({
      [id]: value
    });
  }

  handleForm = (e, Login) => {
    e.preventDefault();
    Login({ variables: { ...this.state } });
  }

  catchData = (data) => {
    const { token } = data.login;
    localStorage.setItem('netflixToken', token);
    this.props.history.push('/');
  }

  catchError = error => {
    console.log(error);
    alert(error.message);
  }

  render() {
    return (
      <Mutation mutation={LOGIN}>
        {
          (login, { data, error }) => {
            if (data) this.catchData(data);
            if (error) this.catchError(error);

            return(
              <form onSubmit={e => this.handleForm(e, login)}>
                <div className="container">
                  <div className="row">
                    <div className="col s12">
                      <Input id="email" name="Email" type="email" value={this.props.email}
                        setInput={this.handleInput} required />
                    </div>
                    <div className="col s12">
                      <Input id="password" name="Password" type="password" value={this.props.password}
                        setInput={this.handleInput} required />
                    </div>
                    <button className="waves-effect waves-light btn btn-primary">Login</button>
                  </div>
                </div>
              </form>
            )
          }
        }
      </Mutation>
    );
  }
}

export default Login;
