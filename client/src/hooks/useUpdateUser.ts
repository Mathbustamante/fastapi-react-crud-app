import { useState } from "react"
import { toast } from "sonner"
import { User } from "../types/user"

type UseUpdateUserProps = {
  onSuccess?: () => void
  onError?: () => void
}

export function useUpdateUser({ onSuccess, onError }: UseUpdateUserProps) {
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)

  async function updateUserRequest(userId: number, user: Omit<User, "id">) {
    setIsUpdatingUser(true)
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      onSuccess?.()
      toast.success("User updated successfully!")
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong"
      onError?.()
      toast.error(errorMessage)
    } finally {
      setIsUpdatingUser(false)
    }
  }

  return { updateUserRequest, isUpdatingUser }
}
