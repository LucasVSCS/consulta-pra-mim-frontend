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
    const cityId = filters.city === undefined || filters.city === null ? '' : filters.city.id
    let query = `${apiUrl}/car-hunters?pageNo=${filters.page}&pageSize=${filters.rowsPerPage}`
    if (filters.status) query += `&status=${filters.status}`
    if (cityId) query += `&cityId=${cityId}`
    if (filters.name) query += `&name=${filters.name}`
    if (filters.tradingName) query += `&tradingName=${filters.tradingName}`
    if (filters.serviceRange.searchRadius) query += `&searchRadius=${filters.serviceRange.searchRadius}`
    if (filters.serviceRange.priceMin) query += `&priceMin=${filters.serviceRange.priceMin.split(',')[0].replace(/\D/g, '')}`
    if (filters.serviceRange.priceMax) query += `&priceMax=${filters.serviceRange.priceMax.split(',')[0].replace(/\D/g, '')}`
    if (filters.serviceRange.yearMin) query += `&yearMin=${filters.serviceRange.yearMin}`
    if (filters.serviceRange.yearMax) query += `&yearMax=${filters.serviceRange.yearMax}`
    if (filters.serviceRange.brandNew) query += `&brandNew=${filters.serviceRange.brandNew}`
    if (filters.serviceDescriptions) query += `&serviceDescription=${filters.serviceDescriptions}`

    const response = await fetch(query)
    return await response.json()
}
