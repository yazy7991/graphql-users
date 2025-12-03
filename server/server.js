import {ApolloServer} from '@apollo/server';
import {startStandalonServer} from '@apollo/server/standalone';
import { users } from './mockDatabase';

// Setup the type definition by defining the type for the Query and Mutation
const typeDefs = `
    type Query {
        getUsers: [User]
        
        getUserById(id: ID!): User

    
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!): User
    
    }

    type User {
        id: ID
        name: String
        age: Int 
        isMarried: Boolean
    
    }
`;

const resolvers = {
    Query: {
        getUsers: () =>{
            return users;
        },

        // In this contet, the parent parameter alows us to access the Query
        getUserById: (parent,args) =>{
            const id = args.id

            return users.find((user)=>user.id===id);
            
        },


    },
    Mutation: {

    }
}

// Create a new Apollo Server - The Apollo Server accepts type definition and resolvers
const server = new ApolloServer ({
    typeDefs,
    resolvers

})

// Set server to listen for incoming request from the Apollo Client
const {url} = await startStandalonServer(server,{
    listen: {port: 4000}
})

console.log(`Server running at: ${url}`);

// Query, Mutation

// typeDefs: - type definitions and schemas

// resolvers


