export const login = async (username, password) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    if (!response.ok) {
      throw new Error('Nome de usuário ou senha inválidos')
    }

    const data = await response.json()
    sessionStorage.setItem('token', data.jwtToken)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
