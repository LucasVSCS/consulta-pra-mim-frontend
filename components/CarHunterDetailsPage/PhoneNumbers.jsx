import {Grid, Paper, Typography} from "@mui/material";

export default function PhoneNumbers({phones}) {
    const formatPhoneNumber = (phoneNumber) => {
        const firstPart = phoneNumber.slice(0, 5);
        const secondPart = phoneNumber.slice(5);
        return `${firstPart}-${secondPart}`;

    }

    return (
        <Paper elevation={3} sx={{mt: 2, p: 2}}>
            <Typography variant='h6' align='center'>
                Números de contato
            </Typography>
            <Grid container justifyContent='center' mt={2}>
                {phones &&
                    phones.map((phone) => (
                        <Grid item key={phone.number} xs={12}>
                            <Typography align='center' variant='h6'>
                                {`(${phone.areaCode}) ${formatPhoneNumber(phone.number)}`}
                            </Typography>
                        </Grid>
                    ))}
            </Grid>
        </Paper>
    )
}