import {useQuery, useMutation,gql} from '@apollo/client'
import { useState } from 'react'

// Setting a query variable to retrieve all users
const GET_USERS = gql`
query GetUsers {
  getUsers {
    id,
    age,
    name,
    isMarried
  }
}
`

// Setting a query variable to retrievea user
const GET_USER_BY_ID = gql`
query GetUserById ($id: ID!) {
  getUserById(id: $id) {
    id,
    age,
    name,
    isMarried
  }
}
`

// Setting a mutation variable to create a new user
const CREATE_USER = gql`
mutation CreateUser ($name: String!, $age: Int!, $isMarried: Boolean!) {
  createUser(name: $name, age: $age, isMarried: $isMarried) {
    name
  }
}
`

function App() {

  const [newUser, setNewUser] = useState({});

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading
  } = useQuery(GET_USERS)

    const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading
  } = useQuery(GET_USER_BY_ID, {
    variables: {id: "2"}
  })

   const [createUser] = useMutation(CREATE_USER, {
    variables: {id: "2"}
  })

  if(getUsersLoading) return <p>Data Loading...</p>

  if(getUsersError) return <p>Error: {getUsersError.message}</p>

  // A function to handle the onclick event when a new user is created
  const handleCreateUser = async () => {
    
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false
      }
    });

  }


  return (
    <>
      <h1>
        User Information Application
      </h1>

      <div>
        <input placeholder='Name...' onChange={(e)=> setNewUser((prev)=>({...prev, name:e.target.value}))}/><br />
        <input placeholder='Age...' type='number' onChange={(e)=> setNewUser((prev)=>({...prev, age:e.target.value}))}/><br />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      {
        getUserByIdLoading ? <p>Loading user...</p>
        :
        (
          <>
            <h3> Selected User:</h3>
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
            <p>Marital Status: {getUserByIdData.getUserById.isMarried ? "Yes" : "No"}</p>
          
          </>
        )
      }
      <div>
        <h3>All Users</h3>
        {getUsersData.getUsers.map((user)=>(
          <div key={user.id}>
            =========================================================
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Marital Status: {user.isMarried ? "Yes" : "No"}</p>
          </div>

        ))}
      </div>
    </>
  )
}

export default App
