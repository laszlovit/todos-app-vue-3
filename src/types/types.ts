export type Todo = {
  content: string
  done: boolean
}

export type TodoWithId = {
  content: string
  done: boolean
  _id: string
}

type MessageResponse = {
  message: string
}

export type ErrorResponse = MessageResponse & {
  stack?: string
}
