  import React, { useState } from 'react';
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import CssBaseline from '@mui/material/CssBaseline';
  import TextField from '@mui/material/TextField';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import Container from '@mui/material/Container';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { SportsSoccer as SportsSoccerIcon } from '@mui/icons-material';
  import './Advertise.css'; // Make sure to import the CSS file
  import image from '../bg.jpg'; // Update the path as necessary

  const defaultTheme = createTheme();

  export default function Advertise() {
    const [title, setTitle] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [license, setLicense] = useState('');
    const [address, setAddress] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [phone, setPhone] = useState('');
    const [services, setServices] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('ownerName', ownerName);
      formData.append('license', license);
      formData.append('address', address);
      formData.append('openingTime', openingTime);
      formData.append('phone', phone);
      formData.append('services', services);
      formData.append('timestamp', new Date().toISOString());

      if (file) {
        formData.append('file', file);
      }

      fetch('http://localhost:8080/api/turfs', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Turf advertised successfully!');
          // Handle success
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error
        });
    };

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="lg" className="advertise-container">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: 4,
              backgroundColor: '#fff',
              borderRadius: '20px',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
            }}
          >
            <Box
              sx={{
                flex: 1,
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SportsSoccerIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className="header-text">
                Advertise Your Turf
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Turf Name"
                  name="title"
                  autoComplete="turf-name"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="custom-input"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="ownerName"
                  label="Turf Owner with Complete Details (with Valid ID Proof)"
                  name="ownerName"
                  autoComplete="owner-details"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="custom-input"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="license"
                  label="Turf License"
                  name="license"
                  autoComplete="license"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="custom-input"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Turf Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="custom-input"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="openingTime"
                  label="Opening Time"
                  name="openingTime"
                  autoComplete="opening-time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="custom-input"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="custom-input"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="services"
                  label="Services"
                  name="services"
                  autoComplete="services"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  className="custom-input"
                />
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 1, mb: 2 }}
                  className="upload-button"
                >
                  Upload Photos/Videos
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  className="btn"
                >
                  Request to Advertise
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={image} // Replace with your image URL
                alt="Advertise"
                className="advertise-image"
              />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
