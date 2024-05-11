import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useState } from "react"
import { DEFAULT_USER_VALUES } from "../lib/constants"
import { MaritalStatus, User } from "../types/user"

type UserFormDialogProps = {
  disabled?: boolean
  setOpen: (open: boolean) => void
  defaultValues?: Omit<User, "id">
  onSubmit: (user: Omit<User, "id">) => void
}

export function UserFormDialog({
  disabled,
  setOpen,
  defaultValues,
  onSubmit,
}: UserFormDialogProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>(
    defaultValues || DEFAULT_USER_VALUES
  )

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  return (
    <Dialog.Root open onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] gap-4 bg-white p-4 w-full max-w-lg border shadow-lg sm:rounded-lg">
          <Dialog.Title className="text-lg font-semibold">
            {Boolean(defaultValues) ? "Edit User" : "Add User"}
          </Dialog.Title>
          <Dialog.Close
            className="absolute right-4 top-4 rounded-sm opacity-70"
            asChild
          >
            <button className="IconButton" aria-label="Close">
              <Cross2Icon className="h-4 w-4" />
            </button>
          </Dialog.Close>
          <form
            className="flex flex-col gap-y-3 py-2"
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit(formData)
            }}
          >
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="first_name">First Name</label>
              <input
                className="border px-2 py-1 rounded"
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="last_name">Last Name</label>
              <input
                className="border px-2 py-1 rounded"
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                className="border px-2 py-1 rounded"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="age">Age</label>
              <input
                className="border px-2 py-1 rounded"
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min={1}
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="marital_status">Marital Status</label>
              <select
                defaultValue={formData.marital_status}
                className="border px-2 py-1 rounded"
                onChange={handleInputChange}
                name="marital_status"
              >
                {Object.values(MaritalStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="address">Address</label>
              <input
                className="border px-2 py-1 rounded"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <button
              type="submit"
              disabled={disabled}
              className="font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-500/90 text-white disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
