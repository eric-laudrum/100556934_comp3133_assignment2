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


@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private apollo: Apollo){}

  login( credentials: any ){
    return this.apollo.query<any>({
      query: LOGIN_QUERY,
      variables: credentials
    }).pipe(
      map(result => result.data.login)
    );
  }
}
