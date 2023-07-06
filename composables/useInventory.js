export const useInventory = () => {

  const config = useRuntimeConfig()

  const get = (url) => {
    return useFetch(url, {
      method: 'get',
      baseURL: config.public.baseUrl,
    })
  }

  const saveFile = (url, formData) => {
    return useFetch(url, {
      method: 'post',
      baseURL: config.public.baseUrl,
      body: formData
    })
  }

  return { get, saveFile }
}
