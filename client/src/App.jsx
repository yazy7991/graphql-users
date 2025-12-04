import {useQuery, useMutation,gql} from '@apollo/client'

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

function App() {

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

  if(getUsersLoading) return <p>Data Loading...</p>

  if(getUsersError) return <p>Error: {getUsersError.message}</p>


  return (
    <>
      <h1>
        User Information Application
      </h1>
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
