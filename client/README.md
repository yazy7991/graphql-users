# 📘 Project Name

The React frontend application that uses Apollo Client to interact with a GraphQL API.

## 🚀 Features

- Fetch data from a GraphQL server using Apollo Client

- Display user data dynamically

- Supports queries and mutations

- Modern React with hooks (e.g., useQuery, useMutation)

- Error handling and loading states

## ⚡ Getting Started
1. Clone the repository
- git clone https://github.com/your-username/project-name.git
- cd project-name

2. Install dependencies
npm install

3. Configure Apollo Client

Make sure you have your GraphQL API endpoint:

// src/apollo/client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;

4. Start the development server
npm run dev


Open http://localhost:5173
 in your browser.




