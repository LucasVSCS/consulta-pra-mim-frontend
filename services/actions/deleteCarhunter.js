const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const deleteCarhunter = async externalId => {
  const response = await fetch(`${apiUrl}/car-hunters/${externalId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    return { success: false }
  }

  return { success: true }
}
