import { describe } from "@jest/globals"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { UserDataTable } from "../../components/UserDataTable"
import { UsersProvider } from "../../providers/UsersProvider"
import { MaritalStatus } from "../../types/user"

describe("User Data Table Component", () => {
  it("should display empty data table message", () => {
    render(
      <UsersProvider>
        <UserDataTable data={[]} isLoading={false} />
      </UsersProvider>
    )

    const message = screen.queryByText("No Data")
    expect(message).toBeInTheDocument()
  })

  it("should display loading indicator when loading data", () => {
    render(
      <UsersProvider>
        <UserDataTable data={[]} isLoading={true} />
      </UsersProvider>
    )

    const leader = screen.getByTestId("loader")
    expect(leader).toBeInTheDocument()
  })

  it("should display the correct number of rows in the table", () => {
    render(
      <UsersProvider>
        <UserDataTable
          data={[
            {
              id: 1,
              first_name: "John",
              last_name: "Doe",
              email: "johndoe@gmail.com",
              age: 25,
              marital_status: MaritalStatus.Single,
              address: "123 Main St",
            },
          ]}
          isLoading={false}
        />
      </UsersProvider>
    )

    const table = screen.getByTestId("table-body").children
    expect(table).toHaveLength(1)
  })
})
