import { cn } from "../lib/utils"
import { User } from "../types/user"
import { UserDataTableRow } from "./UserDataTableRow"
import { UserDataTableToolbar } from "./UserDataTableToolbar"

type UserDataTableProps = {
  data: User[]
  isLoading: boolean
}

export function UserDataTable({ data, isLoading }: UserDataTableProps) {
  return (
    <div className="flex flex-col w-full mx-auto py-5 gap-y-2">
      <UserDataTableToolbar />
      <table
        className={cn(
          "border rounded w-full",
          (isLoading || data.length === 0) && "h-60"
        )}
      >
        <thead className="h-12 text-left border-b">
          <tr>
            <th className="p-4 align-middle">First Name</th>
            <th className="p-4 align-middle">Last Name</th>
            <th className="p-4 align-middle">Email</th>
            <th className="p-4 align-middle">Age</th>
            <th className="p-4 align-middle">Marital Status</th>
            <th className="p-4 align-middle">Address</th>
            <th className="p-4 align-middle">Actions</th>
          </tr>
        </thead>
        <tbody data-testid="table-body" className="relative">
          {isLoading ? (
            <TableLoader />
          ) : data.length === 0 ? (
            <NoDataMessage />
          ) : (
            data.map((row) => <UserDataTableRow key={row.id} user={row} />)
          )}
        </tbody>
      </table>
    </div>
  )
}

function NoDataMessage() {
  return (
    <tr>
      <td colSpan={7} className="text-center">
        <p className="text-neutral-600">No Data</p>
      </td>
    </tr>
  )
}

function TableLoader() {
  return (
    <tr>
      <td colSpan={7}>
        <div
          data-testid="loader"
          className="mx-auto border-gray-100 h-12 w-12 animate-spin rounded-full border-2 border-t-black"
        />
      </td>
    </tr>
  )
}
