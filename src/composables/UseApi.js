/* eslint-disable */
import {
  api
} from 'boot/axios'

export default function useApi(url) {
  /* Uma arrow-function assincrona */
  const liist = async () => {
    try {
      const {
        data
      } = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  /* Uma arrow-function assincrona */
  const post = async (form) => {
    try {
      const {
        data
      } = await api.post(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  /* Uma arrow-function assincrona */
  const update = async (form) => {
    try {
      const {
        data
      } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  /* Uma arrow-function assincrona */
  const remove = async (id) => {
    try {
      const {
        data
      } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    liist,
    post,
    update,
    remove
  }
}
