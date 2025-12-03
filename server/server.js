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
        // In this context args is the body of the request
        getUserById: (parent,args) =>{
            const id = args.id

            return users.find((user)=>user.id===id);
            
        },


    },
    Mutation: {
        createUser: (parent,args) =>{
            const {name,age,isMarried} = args;

            if(!name || !age ||isMarried === undefined){
                throw new Error("All fields are required and isMarried must be true or false.");

            }

            const newUser = {
                id: (users.length + 1).toString(),
                name,
                age,
                isMarried,
            };

            users.push(newUser);
            

        },


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

/* GraphQL has two main operation types:

Query → Read data (GET)

Mutation → Write or modify data (POST/PUT/PATCH/DELETE)

*/

/*
Type Definitions = the schema

They describe:

what data your API has

what clients can query

what operations exist (queries + mutations)

the shape (fields, types) of the data

They use the GraphQL Schema Definition Language (SDL).

*/

/*

Resolvers = the functions that actually fetch or modify your data.

*/


