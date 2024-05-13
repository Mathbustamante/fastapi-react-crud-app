import { useState } from "react"
import { useCreateUser } from "../../hooks/useCreateUser"
import { useUsersContext } from "../../providers/UsersProvider"
import { UserFormDialog } from "../Forms/UserFormDialog"

export function UserDataTableToolbar() {
  const { getUsersRequest } = useUsersContext()
  const [openAddUserForm, setOpenAddUserForm] = useState(false)

  const { createUserRequest, isCreatingUser } = useCreateUser({
    onSuccess: () => {
      getUsersRequest()
      setOpenAddUserForm(false)
    },
  })

  return (
    <>
      {openAddUserForm && (
        <UserFormDialog
          setOpen={setOpenAddUserForm}
          onSubmit={createUserRequest}
          disabled={isCreatingUser}
        />
      )}
      <button
        onClick={() => setOpenAddUserForm(true)}
        className="w-max font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-500/90 text-white"
        type="button"
      >
        Add User
      </button>
    </>
  )
}
