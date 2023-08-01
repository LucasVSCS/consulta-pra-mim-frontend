import * as Yup from 'yup'

export const EditCarHunterSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    tradingName: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Endereço de email inválido').required('Campo obrigatório'),
    cityId: Yup.string().required('Campo obrigatório'),
    serviceDescription: Yup.string().required('Campo obrigatório'),
    isActive: Yup.boolean(),
    socialMedia: Yup.object({
        facebookUrl: Yup.string().url('URL inválida'), instagramUrl: Yup.string().url('URL inválida')
    }),
    serviceRange: Yup.object({
        searchRadius: Yup.number().min(1, 'Precisa ser maior que 0'),
        yearMin: Yup.number().min(1950, 'Precisa ser maior que 1950'),
        yearMax: Yup.number().max(new Date().getFullYear() + 1, `Não pode ser maior que ${new Date().getFullYear() + 1}`),
        priceMin: Yup.number().min(0, 'Must be greater than or equal to 0'),
        priceMax: Yup.number().min(0, 'Must be greater than or equal to 0'),
    })
})
