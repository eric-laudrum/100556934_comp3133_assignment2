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
  mutation Signup(
    $username: String!, 
    $email: String!, 
    $password: String!) {
      signup(
      username: $username, 
      email: $email, 
      password: $password) {
        _id
        username
        email
      }
    }
  `;

const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      _id
      first_name
      last_name
      email
      department
      position
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($eid: ID!) {
    searchEmployeeById(eid: $eid) {
      _id
      first_name
      last_name
      email
      position
      salary
      department
      date_of_joining
      employee_photo
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
        _id
        first_name
      }
    }
  `;

  const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployeeById(
      $eid: ID!, 
      $first_name: String, 
      $last_name: String, 
      $email: String, 
      $position: String, 
      $salary: Float, 
      $department: String, 

      $date_of_joining: String) {
        updateEmployeeById(
          eid: $eid, 
          first_name: $first_name, 
          last_name: $last_name, 
          email: $email, 
          position: $position, 
          salary: $salary, 
          department: $department, 

          date_of_joining: $date_of_joining) {
            _id
            first_name
      }
    }
  `;


  const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployeeById($eid: ID!){
      deleteEmployeeById(eid: $eid)
    }
  `;

  const SEARCH_EMPLOYEES = gql`
    query SearchEmployees($department: String, $position: String){
      searchEmployees(department: $department, position: $position){
        _id
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
      variables: {
        username: credentials.username,
        password: credentials.password
      },
      fetchPolicy: 'network-only'
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
      map(result => result.data ? result.data.getEmployees : [])
    );
  }

  getEmployeeById(id: string) {
    return this.apollo.query<any>({
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid: id },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.searchEmployeeById)
    );
  }

  addEmployee(employeeData: any) {

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: employeeData,
      context: {
        headers: {
            "Authorization": token ? `Bearer ${token}` : ''
          } as any
        },

      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  updateEmployee(id: string, employeeData: any) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_EMPLOYEE,
      variables: { 
        eid: id, 
        ...employeeData,
        salary: Number(employeeData.salary)
      },
      context: {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } as any
      },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { eid: id },
      context: {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } as any
      }
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
