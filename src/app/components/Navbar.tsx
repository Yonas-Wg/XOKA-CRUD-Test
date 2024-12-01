'use client';

import { AppBar, Toolbar, Button, Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useState } from 'react';
import Image from 'next/image'; // Import Image component

const Navbar = () => {
  // Define custom max-width media query (max-width 68rem)
  const isMaxWidthMobile = useMediaQuery('(max-width: 68rem)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const drawerItems = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Link href="/" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 1 }}>
          <HomeIcon sx={{ marginRight: 1 }} /> Home
        </Button>
      </Link>
      <Link href="/employees" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 1 }}>
          <PeopleIcon sx={{ marginRight: 1 }} /> Employees
        </Button>
      </Link>
      <Link href="/departments" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 1 }}>
          <BusinessIcon sx={{ marginRight: 1 }} /> Departments
        </Button>
      </Link>
      <Link href="/companies" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 1 }}>
          <BusinessIcon sx={{ marginRight: 1 }} /> Companies
        </Button>
      </Link>
      <Link href="/candidates" passHref>
        <Button color="inherit" sx={{ display: 'block', padding: 1 }}>
          <GroupAddIcon sx={{ marginRight: 1 }} /> Candidates
        </Button>
      </Link>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#34495E' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" passHref>
            <Image
              src="/images/hrr.jpg" 
              alt="Logo"
              width={80} 
              height={100} 
            />
          </Link>
        </Box>

        {isMaxWidthMobile ? (
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right" // Set the Drawer to open from the right side
              open={drawerOpen}
              onClose={toggleDrawer}
            >
              {drawerItems}
            </Drawer>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ margin: 1 }}>
                <HomeIcon sx={{ marginRight: 1 }} /> Home
              </Button>
            </Link>
            <Link href="/employees" passHref>
              <Button color="inherit" sx={{ margin: 1 }}>
                <PeopleIcon sx={{ marginRight: 1 }} /> Employees
              </Button>
            </Link>
            <Link href="/departments" passHref>
              <Button color="inherit" sx={{ margin: 1 }}>
                <BusinessIcon sx={{ marginRight: 1 }} /> Departments
              </Button>
            </Link>
            <Link href="/companies" passHref>
              <Button color="inherit" sx={{ margin: 1 }}>
                <BusinessIcon sx={{ marginRight: 1 }} /> Companies
              </Button>
            </Link>
            <Link href="/candidates" passHref>
              <Button color="inherit" sx={{ margin: 1 }}>
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
