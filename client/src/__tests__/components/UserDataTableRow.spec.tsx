import { describe } from "@jest/globals"
import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserDataTableRow } from "../../components/DataTable/UserDataTableRow"
import { UsersProvider } from "../../providers/UsersProvider"
import { MaritalStatus } from "../../types/user"

describe("User Data Table Row Component", () => {
  it("should display the correct data for a user", () => {
    render(
      <UsersProvider>
        <table>
          <tbody>
            <UserDataTableRow
              user={{
                id: 1,
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@gmail.com",
                age: 25,
                marital_status: MaritalStatus.Single,
                address: "1017 HR Rotterdam",
              }}
            />
          </tbody>
        </table>
      </UsersProvider>
    )

    const firstName = screen.getByText("John")
    expect(firstName).toBeInTheDocument()

    const lastName = screen.getByText("Doe")
    expect(lastName).toBeInTheDocument()

    const email = screen.getByText("johndoe@gmail.com")
    expect(email).toBeInTheDocument()

    const age = screen.getByText("25")
    expect(age).toBeInTheDocument()

    const maritalStatus = screen.getByText("single")
    expect(maritalStatus).toBeInTheDocument()

    const address = screen.getByText("1017 HR Rotterdam")
    expect(address).toBeInTheDocument()
  })

  it("should display the edit form when the edit button is clicked", () => {
    render(
      <UsersProvider>
        <table>
          <tbody>
            <UserDataTableRow
              user={{
                id: 1,
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@gmail.com",
                age: 25,
                marital_status: MaritalStatus.Single,
                address: "1017 HR Rotterdam",
              }}
            />
          </tbody>
        </table>
      </UsersProvider>
    )

    const editButton = screen.getByRole("button", { name: "Edit" })
    expect(editButton).toBeInTheDocument()

    act(() => {
      userEvent.click(editButton)
    })

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
  })
})
