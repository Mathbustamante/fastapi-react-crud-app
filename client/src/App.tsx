import { UserDataTable } from "./components"
import { useUsersContext } from "./providers/UsersProvider"

function App() {
  const { users, isLoading } = useUsersContext()

  return (
    <div className="flex flex-col h-screen py-10 gap-y-5 px-5">
      <UserDataTable data={users} isLoading={isLoading} />
    </div>
  )
}

export default App
