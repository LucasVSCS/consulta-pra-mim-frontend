const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const deleteCarhunter = async (externalId, token) => {
  const response = await fetch(`${apiUrl}/car-hunters/${externalId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }
  })

  if (!response.ok) {
    return { success: false }
  }

  return { success: true }
}
