import {Grid} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function SocialMediaLinks({socialMedia, phones}) {
    return (
        <Grid container justifyContent='space-around' mt={3}>
            {socialMedia && (
                <Grid item>
                    <a href={socialMedia.facebookUrl} target='_blank' rel='noreferrer'
                       style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        <FacebookIcon sx={{fontSize: 35, color: '#1877F2'}}/>
                    </a>
                </Grid>
            )}
            {socialMedia && (
                <Grid item>
                    <a href={socialMedia.instagramUrl} target='_blank' rel='noreferrer'
                       style={{color: 'inherit', textDecoration: 'none'}}
                    >
                        <InstagramIcon sx={{fontSize: 35, color: '#E1306C'}}/>
                    </a>
                </Grid>
            )}
            {phones &&
                phones.map((phone) => {
                    if (phone.isWhatsapp) {
                        return (
                            <Grid item key={phone.number}>
                                <a href={`https://wa.me/${phone.areaCode}${phone.number}`} target='_blank'
                                   rel='noreferrer' style={{color: 'inherit', textDecoration: 'none'}}
                                >
                                    <WhatsAppIcon sx={{fontSize: 35, color: '#25D366'}}/>
                                </a>
                            </Grid>
                        );
                    }
                    return null;
                })}
        </Grid>
    )
}