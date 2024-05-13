import { describe } from "@jest/globals"
import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { UserDataTableToolbar } from "../../components/DataTable/UserDataTableToolbar"
import { UsersProvider } from "../../providers/UsersProvider"

describe("User Data Table Toolbar Component", () => {
  it("should display a button to add a new user", () => {
    render(
      <UsersProvider>
        <UserDataTableToolbar />
      </UsersProvider>
    )

    const addUserButton = screen.getByRole("button", { name: "Add User" })
    expect(addUserButton).toBeInTheDocument()
  })

  it("should open the add user form when the button is clicked", () => {
    render(
      <UsersProvider>
        <UserDataTableToolbar />
      </UsersProvider>
    )

    const addUserButton = screen.getByRole("button", { name: "Add User" })
    expect(addUserButton).toBeInTheDocument()

    act(() => {
      userEvent.click(addUserButton)
    })

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
  })
})
