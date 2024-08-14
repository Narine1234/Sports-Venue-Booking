// PurePlayFooter.js
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import logo from './path/to/your/logo.png'; // Replace with the path to your logo

const footerLinks = [
  { title: 'Home', url: '/home', icon: <HomeIcon /> },
  { title: 'Book a Turf', url: '/book-turf', icon: <EventIcon /> },
  { title: 'Pricing', url: '/pricing', icon: <AttachMoneyIcon /> },
  { title: 'Contact Us', url: '/contact', icon: <ContactMailIcon /> },
  { title: 'About Us', url: '/about', icon: <InfoIcon /> },
  { title: 'FAQ', url: '/faq', icon: <HelpIcon /> },
];

const contactInfo = {
  address: '123 PurePlay St, Turf City, TC 12345',
  email: 'info@pureplay.com',
  phone: '+1 234 567 890',
};

export default function PurePlayFooter() {
  return (
    <Box sx={{ bgcolor: '#4e688a', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} textAlign="center">
            {/* <img src={logo} alt="PurePlay Logo" style={{ height: 50, marginBottom: 16 }} /> */}
            <Box>
              <Typography variant="body1" color="inherit">
                <LocationOnIcon /> {contactInfo.address}
              </Typography>
              <Typography variant="body1" color="inherit">
                <EmailIcon /> {contactInfo.email}
              </Typography>
              <Typography variant="body1" color="inherit">
                <PhoneIcon /> {contactInfo.phone}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={4}>
              {footerLinks.map((link, index) => (
                <Grid item key={index} xs={6} sm={4}>
                  <Link href={link.url} color="inherit" underline="none">
                    <IconButton color="inherit">
                      {link.icon}
                    </IconButton>
                    <Typography variant="h6" color="inherit" gutterBottom>
                      {link.title}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            Conditions of Use & Sale | Privacy Notice | Interest-Based Ads
          </Typography>
          <Typography variant="body2" color="inherit">
            © 2024 PurePlay, Inc. or its affiliates
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
