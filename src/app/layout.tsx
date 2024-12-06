import { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="HR Management System" />
        <title>HR Management</title>
      </head>
      <body>
        <Box>
          {/* Navbar Section */}
          <Navbar />

          {/* Toast Notification Container */}
          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
            theme="light" 
          />

          {/* Main Content Section */}
          <Container sx={{ marginTop: 4 }}>
            {children}
          </Container>

          {/* Footer Section */}
          <Footer />
        </Box>
      </body>
    </html>
  );
}
