import { useState } from "react"
import { toast } from "sonner"
import { User } from "../types/user"

type UseCreateUserProps = {
  onSuccess?: () => void
  onError?: () => void
}

export function useCreateUser({ onSuccess, onError }: UseCreateUserProps) {
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  async function createUserRequest(user: Omit<User, "id">) {
    setIsCreatingUser(true)
    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.detail)
      }

      onSuccess?.()
      toast.success("User created successfully!")
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong"
      onError?.()
      toast.error(errorMessage)
    } finally {
      setIsCreatingUser(false)
    }
  }

  return { createUserRequest, isCreatingUser }
}
