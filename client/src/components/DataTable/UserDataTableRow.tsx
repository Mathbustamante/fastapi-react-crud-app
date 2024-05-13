import { useState } from "react"
import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useUpdateUser } from "../../hooks/useUpdateUser"
import { useUsersContext } from "../../providers/UsersProvider"
import { User } from "../../types/user"
import { UserFormDialog } from "../Forms/UserFormDialog"
import { TableCell, TableRow } from "../Table"

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
      <TableRow key={user.id} className="even:bg-neutral-50">
        <TableCell>{user.first_name}</TableCell>
        <TableCell>{user.last_name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.age}</TableCell>
        <TableCell>{user.marital_status}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell className="flex gap-x-2">
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
        </TableCell>
      </TableRow>
    </>
  )
}
