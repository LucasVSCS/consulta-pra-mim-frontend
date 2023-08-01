export const formatPhoneNumber = (areaCode, number) => {
    if (!areaCode || !number) return ''
    const formattedNumber = `${number.slice(0, 5)}-${number.slice(5)}`
    return `(${areaCode}) ${formattedNumber}`
}

export const handlePhoneChange = (event, index, setPhone, setPhones) => {
    const value = event.target.value
    setPhone(value)
    if (value === '') {
        setPhones(prevPhones => {
            const newPhones = [...prevPhones]
            newPhones[index].areaCode = ''
            newPhones[index].number = ''
            return newPhones
        })
    } else {
        const unmaskedValue = value.replace(/\D/g, '')
        const areaCode = unmaskedValue.slice(0, 2)
        const number = unmaskedValue.slice(2)
        setPhones(prevPhones => {
            const newPhones = [...prevPhones]
            newPhones[index].areaCode = areaCode
            newPhones[index].number = number
            return newPhones
        })
    }
}

export const handleWhatsAppChange = (event, index, setPhones) => {
    setPhones(prevPhones => {
        const newPhones = [...prevPhones]
        newPhones[index].isWhatsapp = event.target.checked
        return newPhones
    })
}