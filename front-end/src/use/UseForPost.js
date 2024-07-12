export default async function UseForPost(endpoint, changeLoader, changeError, data) {
  changeLoader()
  try {
    const response = await fetch(`${endpoint}/registration`, {
      method: 'POST',
      body: data
    });

    if (response.ok) {
      changeLoader()
      return await response.json();
    } else {
      changeLoader()
      changeError()
      return { error: "you can't register now" };
    }
  } catch (error) {
    changeError()
    changeLoader()
    return { error: error.message };
  }
}