import { describe } from "@jest/globals"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { UserFormDialog } from "../../components/UserFormDialog"
import { MaritalStatus } from "../../types/user"

describe("User Form Dialog Component", () => {
  it("should display a form dialog with the correct fields", () => {
    render(
      <UserFormDialog
        defaultValues={{
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@gmail.com",
          age: 25,
          marital_status: MaritalStatus.Single,
          address: "1017 HR Rotterdam",
        }}
        onSubmit={jest.fn()}
        setOpen={jest.fn()}
      />
    )

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()

    const firstNameInput = screen.getByRole("textbox", {
      name: "First Name",
    })
    expect(firstNameInput).toBeInTheDocument()
    expect(firstNameInput).toHaveValue("John")

    const lastNameInput = screen.getByRole("textbox", {
      name: "Last Name",
    })
    expect(lastNameInput).toBeInTheDocument()
    expect(lastNameInput).toHaveValue("Doe")

    const emailInput = screen.getByRole("textbox", {
      name: "Email",
    })
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveValue("johndoe@gmail.com")

    const ageInput = screen.getByRole("spinbutton", {
      name: "Age",
    })
    expect(ageInput).toBeInTheDocument()
    expect(ageInput).toHaveValue(25)

    const addressInput = screen.getByRole("textbox", {
      name: "Address",
    })
    expect(addressInput).toBeInTheDocument()
    expect(addressInput).toHaveValue("1017 HR Rotterdam")
  })

  it("should disable the submit button if the form is disabled", () => {
    render(
      <UserFormDialog
        defaultValues={{
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@gmail.com",
          age: 25,
          marital_status: MaritalStatus.Single,
          address: "1017 HR Rotterdam",
        }}
        onSubmit={jest.fn()}
        setOpen={jest.fn()}
        disabled
      />
    )

    const submitButton = screen.getByRole("button", { name: "Submit" })
    expect(submitButton).toBeDisabled()
  })
})
