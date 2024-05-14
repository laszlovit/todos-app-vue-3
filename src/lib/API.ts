import axios from 'axios'
import type { Todo, TodoWithId } from '@/types/types'

const api = axios.create({
  baseURL: 'https://ts-express-api-one.vercel.app/api/v1'
})

export async function findAll() {
  const { data } = await api.get<TodoWithId[]>('/todos')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return data
}

export async function createOne(todo: Todo) {
  const { data } = await api.post<TodoWithId[]>('/todos', todo)
  return data
}
