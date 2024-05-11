import { MaritalStatus, User } from "../types/user"

export const DEFAULT_USER_VALUES: Omit<User, "id"> = {
  first_name: "",
  last_name: "",
  email: "",
  age: 1,
  marital_status: MaritalStatus.Single,
  address: "",
}
