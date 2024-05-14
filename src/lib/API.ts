import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ts-express-api-one.vercel.app/api/v1'
})

export async function findAll() {
  const { data } = await api.get('/todos')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return data
}

export async function createOne() {}
