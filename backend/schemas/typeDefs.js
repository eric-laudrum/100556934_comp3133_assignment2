export const typeDefs = `#graphql

    type AuthResponse{
        status: Boolean
        message: String
        token: String
    }

    type User{
        id: ID!
        username: String!
        email: String!
    }

    type Employee{
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }

    type Query{
        login( 
            username: String, 
            email: String, 
            password: String!
        ): AuthResponse
        
        getEmployees: [ Employee ]
        searchEmployeeById(eid: ID!): Employee
    }

    type Mutation{
        signup(
            username: String!,
            email: String!, 
            password: String!
        ): User    

        addEmployee(
            first_name: String!,
            last_name: String!,
            email: String!,
            gender: String!,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String    
        ): Employee
        
        updateEmployeeById(
            eid: ID!, 
            salary: Float,
            designation: String
        ): Employee

        deleteEmployeeById(
            eid: ID!
        ): String
    }



`;


