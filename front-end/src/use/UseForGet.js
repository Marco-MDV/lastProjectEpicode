export default async function UseForGet(endpoint , changeLoader, changeError) {
  try {
    const response = await fetch(endpoint)
    if (response.ok) {
      changeLoader()
      return await response.json()
    }else{
      changeLoader()
      changeError()
    }
  } catch (error) {
    return error
  }
}
