'use client';

import { AppBar, Toolbar, Button, Box, useMediaQuery, IconButton, Drawer, Divider } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work'; // New icon for Departments
import CorporateFareIcon from '@mui/icons-material/CorporateFare'; // New icon for Companies
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useState } from 'react';
import Image from 'next/image'; // Import Image component

const Navbar = () => {
  // Define custom max-width media query (max-width 68rem)
  const isMaxWidthMobile = useMediaQuery('(max-width: 68rem)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const drawerItems = (
    <Box sx={{ width: 250, backgroundColor: '#2C3E50', height: '100%', paddingTop: 2 }}>
      <Link href="/" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 2, width: '100%' }}>
          <HomeIcon sx={{ marginRight: 1 }} /> Home
        </Button>
      </Link>
      <Link href="/employees" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 2, width: '100%' }}>
          <PeopleIcon sx={{ marginRight: 1 }} /> Employees
        </Button>
      </Link>
      <Link href="/departments" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 2, width: '100%' }}>
          <WorkIcon sx={{ marginRight: 1 }} /> Departments 
        </Button>
      </Link>
      <Link href="/companies" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 2, width: '100%' }}>
          <CorporateFareIcon sx={{ marginRight: 1 }} /> Companies 
        </Button>
      </Link>
      <Link href="/candidates" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 2, width: '100%' }}>
          <GroupAddIcon sx={{ marginRight: 1 }} /> Candidates
        </Button>
      </Link>
      <Divider sx={{ marginTop: 2, backgroundColor: '#7F8C8D' }} />
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#34495E', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" passHref>
            <Image
              src="/images/hrr.jpg"
              alt="Logo"
              width={90} 
              height={100} 
              style={{
                borderRadius: '8px', 
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </Link>
        </Box>

        {isMaxWidthMobile ? (
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right" 
              open={drawerOpen}
              onClose={toggleDrawer}
              sx={{
                '& .MuiDrawer-paper': {
                  backgroundColor: '#34495E',
                  color: 'white',
                  width: 250,
                  padding: 0,
                  boxSizing: 'border-box',
                },
              }}
            >
              {drawerItems}
            </Drawer>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ margin: 1, '&:hover': { backgroundColor: '#527385' } }}>
                <HomeIcon sx={{ marginRight: 1 }} /> Home
              </Button>
            </Link>
            <Link href="/employees" passHref>
              <Button color="inherit" sx={{ margin: 1, '&:hover': { backgroundColor: '#527385' } }}>
                <PeopleIcon sx={{ marginRight: 1 }} /> Employees
              </Button>
            </Link>
            <Link href="/departments" passHref>
              <Button color="inherit" sx={{ margin: 1, '&:hover': { backgroundColor: '#527385' } }}>
                <WorkIcon sx={{ marginRight: 1 }} /> Departments
              </Button>
            </Link>
            <Link href="/companies" passHref>
              <Button color="inherit" sx={{ margin: 1, '&:hover': { backgroundColor: '#527385' } }}>
                <CorporateFareIcon sx={{ marginRight: 1 }} /> Companies 
              </Button>
            </Link>
            <Link href="/candidates" passHref>
              <Button color="inherit" sx={{ margin: 1, '&:hover': { backgroundColor: '#527385' } }}>
                <GroupAddIcon sx={{ marginRight: 1 }} /> Candidates
              </Button>
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
