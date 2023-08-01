const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const updateCarhunter = async (externalId, data, token) => {
    try {
        const response = await fetch(`${apiUrl}/car-hunters/${externalId}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json', Authorization: `${token}`
            }, body: JSON.stringify(data)
        })
        if (!response.ok) {
            return {success: false}
        }
        return {success: true}
    } catch (error) {
        console.error(error)
    }
}
