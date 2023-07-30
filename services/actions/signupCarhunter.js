const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const signupCarhunter = async (
  values,
  { setSubmitting, resetForm },
  enqueueSnackbar
) => {
  const formData = {
    name: values.name,
    tradingName: values.tradingName,
    email: values.email,
    serviceDescription: values.serviceDescription,
    cityId: values.selectedCity.id,
    phones: [
      {
        areaCode: values.phone.replace(/[^0-9]/g, '').slice(0, 2),
        number: values.phone.replace(/[^0-9]/g, '').slice(2),
        isWhatsapp: values.isWhatsapp
      }
    ]
  }

  try {
    const response = await fetch(`${apiUrl}/car-hunters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      resetForm()
      enqueueSnackbar('Cadastro solicitado com sucesso!', {
        variant: 'success'
      })
    } else {
      enqueueSnackbar('Ocorreu um erro ao solicitar o cadastro', {
        variant: 'error'
      })
    }
  } catch (error) {
    enqueueSnackbar('Ocorreu um erro ao solicitar o cadastro', {
      variant: 'error'
    })
  }

  setSubmitting(false)
}
