import { User } from "../../types/user"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table"
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
      <Table className={isLoading || data.length === 0 ? "h-60" : ""}>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Marital Status</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="table-body" className="relative">
          {isLoading ? (
            <TableLoader />
          ) : data.length === 0 ? (
            <NoDataMessage />
          ) : (
            data.map((row) => <UserDataTableRow key={row.id} user={row} />)
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function NoDataMessage() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center">
        <p className="text-neutral-600">No Data</p>
      </TableCell>
    </TableRow>
  )
}

function TableLoader() {
  return (
    <TableRow>
      <TableCell colSpan={7}>
        <div
          data-testid="loader"
          className="mx-auto border-gray-100 h-12 w-12 animate-spin rounded-full border-2 border-t-black"
        />
      </TableCell>
    </TableRow>
  )
}
