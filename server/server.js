import {ApolloServer} from '@apollo/server';
import {startStandalonServer} from '@apollo/server/standalone';

// Create a new Apollo Server
const server = new ApolloServer ({

})

// Set server to listen for incoming request from the Apollo Client
const {url} = await startStandalonServer(server,{
    listen: {port: 4000}
})

console.log(`Server running at: ${url}`);

// Query, Mutation

// typeDefs: - type definitions and schemas

