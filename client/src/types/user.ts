export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  age: number
  address: string
  marital_status: MaritalStatus
}

export enum MaritalStatus {
  Single = "single",
  Married = "married",
  Divorced = "divorced",
  Other = "other",
}

export type UsersContextValue = {
  users: User[]
  isLoading: boolean
  getUsersRequest: () => void
}
