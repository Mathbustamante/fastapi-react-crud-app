import { useState } from "react"
import { useDeleteUser } from "../hooks/useDeleteUser"
import { useUpdateUser } from "../hooks/useUpdateUser"
import { useUsersContext } from "../providers/UsersProvider"
import { User } from "../types/user"
import { UserFormDialog } from "./UserFormDialog"

type UserTableRowProps = {
  user: User
}

export function UserDataTableRow({ user }: UserTableRowProps) {
  const { getUsersRequest } = useUsersContext()
  const [openEditForm, setOpenEditForm] = useState(false)

  const { updateUserRequest, isUpdatingUser } = useUpdateUser({
    onSuccess: () => {
      getUsersRequest()
      setOpenEditForm(false)
    },
  })

  const { deleteUserRequest, isDeletingUser } = useDeleteUser({
    onSuccess: () => getUsersRequest(),
  })

  const disabledButtons = isDeletingUser || isUpdatingUser
  return (
    <>
      {openEditForm && (
        <UserFormDialog
          setOpen={setOpenEditForm}
          onSubmit={(data) => {
            updateUserRequest(user.id, data)
          }}
          disabled={isUpdatingUser}
          defaultValues={user}
        />
      )}
      <tr key={user.id}>
        <td className="p-4 align-middle truncate">{user.first_name}</td>
        <td className="p-4 align-middle truncate">{user.last_name}</td>
        <td className="p-4 align-middle truncate">{user.email}</td>
        <td className="p-4 align-middle truncate">{user.age}</td>
        <td className="p-4 align-middle truncate">{user.marital_status}</td>
        <td className="p-4 align-middle truncate">{user.address}</td>
        <td className="p-4 align-middle flex gap-x-2">
          <button
            type="button"
            disabled={disabledButtons}
            onClick={() => setOpenEditForm(true)}
            className="font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-500/90 text-white disabled:opacity-50"
          >
            Edit
          </button>
          <button
            type="button"
            disabled={disabledButtons}
            onClick={() => deleteUserRequest(user.id)}
            className="font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-500/90 text-white disabled:opacity-50"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}
