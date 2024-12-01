import { Box, Typography, Button, Container, Grid } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Welcome Title */}
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 'bold', 
          color: '#1976d2', 
          textAlign: 'center', 
          lineHeight: 1.2, 
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          marginBottom: 3 // Spacing below the heading
        }}
      >
        Welcome To The HR
        <br />
        Management System
      </Typography>

      {/* Subtitle */}
      <Typography variant="h6" sx={{ marginTop: 2, color: 'gray', textAlign: 'center' }}>
        Manage employees, candidates, and other HR-related tasks efficiently with ease.
      </Typography>
      
      {/* Get Started Button */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ padding: '10px 20px', boxShadow: 2, '&:hover': { boxShadow: 6 } }} 
          href="/employees"
        >
          Get Started
        </Button>
      </Box>

      {/* Grid of Features */}
      <Grid container spacing={4} sx={{ marginTop: 5, justifyContent: 'center' }}>
        
        {/* Employees */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 2, '&:hover': { boxShadow: 6 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Employees</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#1976d2' }}>
              View, add, and manage employees in the system.
            </Typography>
          </Box>
        </Grid>

        {/* Candidates */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 2, '&:hover': { boxShadow: 6 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Candidates</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#1976d2' }}>
              Manage candidate applications and track their progress.
            </Typography>
          </Box>
        </Grid>

        {/* Reports */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow: 2, '&:hover': { boxShadow: 6 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Reports</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#1976d2' }}>
              Generate detailed reports for HR-related tasks.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
