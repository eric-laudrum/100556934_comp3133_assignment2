import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const LOGIN_QUERY = gql`
  query Login($username: String, $password: String!) {
      login(username: $username, password: $password) {
        status
        message
        token
      }
    }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

@Injectable({
  providedIn: 'root',
})


export class Auth {
  constructor(private apollo: Apollo){}

  login( credentials: any ){
    return this.apollo.query<any>({
      query: LOGIN_QUERY,
      variables: credentials,
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => result.data.login)
    );
  }

  signup(userVars: any) {
    return this.apollo.mutate<any>({
      mutation: SIGNUP_MUTATION,
      variables: userVars
    }).pipe(map(result => result.data.signup));
  }
}
