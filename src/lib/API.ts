import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { Todo, TodoWithId, ErrorResponse } from '@/types/types'

const api = axios.create({
  baseURL: 'https://ts-express-api-one.vercel.app/api/v1/'
})

export type APIError = AxiosError<ErrorResponse>

async function extractData<T>(promise: Promise<AxiosResponse<T>>) {
  const { data } = await promise
  // eslint-disable-next-line no-promise-executor-return
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data
}

function getToken(): string | null {
  // Retrieve the JWT token from local storage
  return localStorage.getItem('token')
}

function getRequestConfig(): AxiosRequestConfig {
  const token = getToken()
  const config: AxiosRequestConfig = {}
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
  }
  return config
}

export async function findAll() {
  return extractData(api.get<TodoWithId[]>('/todos'))
}

export async function createOne(todo: Todo) {
  return extractData(api.post<TodoWithId>('/todos', todo, getRequestConfig()))
}

export async function findOne(id: string) {
  return extractData(api.get<TodoWithId>(`/todos/${id}`, getRequestConfig()))
}

export async function updateOne(id: string, todo: Todo) {
  return extractData(api.put<TodoWithId>(`/todos/${id}`, todo, getRequestConfig()))
}

export async function deleteOne(id: string) {
  return extractData(api.delete(`/todos/${id}`, getRequestConfig()))
}
