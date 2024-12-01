import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 2,
        backgroundColor: '#34495E', 
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} HR Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
