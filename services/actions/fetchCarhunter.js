const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const fetchCarhunter = async (externalId) => {
    try {
        const response = await fetch(`${apiUrl}/car-hunters/${externalId}`)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export const fetchPaginatedCarhunters = async (page, sort, order, rowsPerPage, status, cityId, name, tradingName) => {
    const response = await fetch(`${apiUrl}/car-hunters?pageNo=${page}&sortBy=${sort}&sortOrder=${order}&pageSize=${rowsPerPage}&status=${status}&cityId=${cityId}&name=${name}&tradingName=${tradingName}`)

    const data = await response.json()

    return {
        data: data.content, total: data.totalElements
    }
}

export const fetchIndexCarhunters = async (filters) => {
    const response = await fetch(
        `${apiUrl}/car-hunters?pageNo=${filters.page}&pageSize=${filters.rowsPerPage}&status=${filters.status}&cityId=${filters.cityId}&name=${filters.name}&tradingName=${filters.tradingName}`
    )
    return await response.json()
}