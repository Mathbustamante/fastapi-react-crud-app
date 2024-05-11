import { useState } from "react"
import { toast } from "sonner"

type UseDeleteUserProps = {
  onSuccess?: () => void
  onError?: () => void
}

export function useDeleteUser({ onSuccess, onError }: UseDeleteUserProps) {
  const [isDeletingUser, setIsDeletingUser] = useState(false)

  async function deleteUserRequest(id: number) {
    setIsDeletingUser(true)
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      onSuccess?.()
      toast.success("User deleted successfully!")
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong"
      onError?.()
      toast.error(errorMessage)
    } finally {
      setIsDeletingUser(false)
    }
  }

  return {
    deleteUserRequest,
    isDeletingUser,
  }
}
