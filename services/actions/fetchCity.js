const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchCity = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/cities/${id}`)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}