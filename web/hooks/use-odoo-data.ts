"use client"
import { useOdoo } from "@/components/odoo-provider"
import useSWR from "swr"

type UseOdooDataOptions = {
  model: string
  domain?: any[]
  fields?: string[]
  limit?: number
  offset?: number
  order?: string
  context?: Record<string, any>
}

export function useOdooData<T = any>({
  model,
  domain = [],
  fields = [],
  limit = 0,
  offset = 0,
  order = "",
  context = {},
}: UseOdooDataOptions) {
  const { client, isConnected, isLoading: isOdooLoading } = useOdoo()

  const fetcher = async () => {
    if (!client || !isConnected) {
      throw new Error("Odoo client not connected")
    }

    const options = {
      limit,
      offset,
      order,
      context,
    }

    return await client.searchRead(model, domain, fields, options)
  }

  const { data, error, isLoading, mutate } = useSWR(
    isConnected
      ? `odoo:${model}:${JSON.stringify(domain)}:${JSON.stringify(fields)}:${limit}:${offset}:${order}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const create = async (values: Record<string, any>) => {
    if (!client || !isConnected) {
      throw new Error("Odoo client not connected")
    }

    const id = await client.create(model, values)
    mutate()
    return id
  }

  const update = async (id: number, values: Record<string, any>) => {
    if (!client || !isConnected) {
      throw new Error("Odoo client not connected")
    }

    const result = await client.write(model, id, values)
    mutate()
    return result
  }

  const remove = async (id: number) => {
    if (!client || !isConnected) {
      throw new Error("Odoo client not connected")
    }

    const result = await client.unlink(model, [id])
    mutate()
    return result
  }

  const callMethod = async (method: string, args: any[] = [], kwargs: any = {}) => {
    if (!client || !isConnected) {
      throw new Error("Odoo client not connected")
    }

    const result = await client.callMethod(model, method, args, kwargs)
    mutate()
    return result
  }

  return {
    data: data as T[],
    error,
    isLoading: isLoading || isOdooLoading,
    create,
    update,
    remove,
    callMethod,
    refresh: mutate,
  }
}
