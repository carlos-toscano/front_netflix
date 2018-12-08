import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_PROFILE = gql`
  query GET_PROFILE {
    me {
      first_name,
      last_name,
      email,
      birth_date,
      gender,
      nationality,
      subscription_id {
        type_subscription,
        start_date,
        end_date
      }
    }
  }
`;

class Me extends Component {

  render() {
    return (
      <div className="container">
        <Query query={GET_PROFILE}>
          {
            ({ loading, error, data }) => {
              if (error) return <h4>Ocurrió un error...</h4>
              if (loading) return <h4>Cargando...</h4>

              const { me } = data;

              return (
                <div className="col s12">
                  <h4>Nombre: {me.first_name} {me.last_name}</h4>
                  <h5>Email: {me.email}</h5>
                  <h5>Nacimiento: {me.birth_date}</h5>
                  <h5>Gender: {me.gender}</h5>
                  <h5>Nacionalidad: {me.nationality}</h5>
                  <h5>Subscription: {me.subscription_id.type_subscription}</h5>
                  <h5>Inicio: {new Date(me.subscription_id.start_date * 1000).toLocaleDateString()}</h5>
                  <h5>Fin: {new Date(me.subscription_id.end_date / 1000).toLocaleDateString()}</h5>
                  <button className="waves-effect waver-light btn btn-primary">Actualizar Subscripción</button>
                </div>
              );
            }
          }
        </Query>
      </div>
    )
  }
}

export default Me;
