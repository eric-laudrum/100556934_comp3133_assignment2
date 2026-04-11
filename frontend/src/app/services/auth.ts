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

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!, 
    $last_name: String!, 
    $email: String!, 
    $position: String!, 
    $salary: Float!, 
    $date_of_joining: String!, 
    $department: String!,

    $employee_photo: String) {
      addEmployee(
      first_name: $first_name, 
      last_name: $last_name, 
      email: $email, 
      position: $position, 
      salary: $salary, 
      date_of_joining: $date_of_joining, 
      department: $department, 

      employee_photo: $employee_photo) {
        id
        first_name
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


export class AuthService {
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

  addEmployee(employeeData: any) {
  return this.apollo.mutate({
    mutation: ADD_EMPLOYEE,
    variables: employeeData,
    refetchQueries: [{ query: GET_EMPLOYEES }]
  });
}



  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    });
  }

  searchEmployees(dept?: string, pos?: string) {
    return this.apollo.query<any>({
      query: SEARCH_EMPLOYEES,
      variables: { department: dept, position: pos }
    }).pipe(
      map(result => result.data.searchEmployees)
    );
  }

}
