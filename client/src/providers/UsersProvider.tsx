import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { User, UsersContextValue } from "../types/user"

const UsersDataContext = createContext<UsersContextValue | undefined>(undefined)

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getUsersRequest() {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:8000/api/users")
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      const data = await response.json()
      setUsers(data.users)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsersRequest()
  }, [])

  return (
    <UsersDataContext.Provider value={{ users, isLoading, getUsersRequest }}>
      {children}
    </UsersDataContext.Provider>
  )
}

export const useUsersContext = () => {
  const context = useContext(UsersDataContext)
  if (!context) {
    throw new Error("'useUsers' can only be used inside the UsersProvider")
  }
  return context
}
