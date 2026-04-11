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

const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      first_name
      last_name
      email
      department
      position
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!){
    deleteEmployee(id: $id)
  }
`;

const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($department: String, $position: String){
    searchEmployees(department: $department, position: $position){
      id
      first_name
      last_name
      department
      position
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


  getEmployees() {
    return this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map(result => result.data.getEmployees)
    );
  }

    deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    });
  }
}
