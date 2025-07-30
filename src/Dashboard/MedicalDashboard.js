// MedicalDashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Button
} from '@mui/material';

import {
  Menu as MenuIcon,
  Inventory2 as InventoryIcon,
  ShoppingCart as SalesIcon,
  LocalMall as PurchaseIcon,
  People as CustomerIcon,
  Storefront as SupplierIcon,
  BarChart as ReportIcon,
  QrCodeScanner as BarcodeIcon,
  Security as SecurityIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

import { Routes, Route, useNavigate } from 'react-router-dom';

import Inventory from '../Sidebar/Inventory';
import Sales from '../Sidebar/Sales';
import Purchase from '../Sidebar/Purchase';
import Customer from '../Sidebar/Customer';
import ReportAnalysis from '../Sidebar/ReportAnalysis';
import BarcodeIntegration from '../Sidebar/BarcodeIntegration';
import SecurityAccess from '../Sidebar/SecurityAccess';
import SupplierManagement from '../SuplierPages/SupplierManagement';

const drawerWidth = 240;

const MedicalDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: 'Inventory', icon: <InventoryIcon sx={{ color: '#4fc3f7' }} />, path: '/inventory' },
    { label: 'Sales', icon: <SalesIcon sx={{ color: '#4fc3f7' }} />, path: '/sales' },
    { label: 'Purchase', icon: <PurchaseIcon sx={{ color: '#4fc3f7' }} />, path: '/purchase' },
    { label: 'Customer', icon: <CustomerIcon sx={{ color: '#4fc3f7' }} />, path: '/customer' },
    { label: 'Supplier', icon: <SupplierIcon sx={{ color: '#4fc3f7' }} />, path: '/supplier' },
    { label: 'Report & Analysis', icon: <ReportIcon sx={{ color: '#4fc3f7' }} />, path: '/reports' },
    { label: 'Barcode Integration', icon: <BarcodeIcon sx={{ color: '#4fc3f7' }} />, path: '/barcode' },
    { label: 'Security & Access', icon: <SecurityIcon sx={{ color: '#4fc3f7' }} />, path: '/security' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#212235' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Medical Shop Dashboard
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
            onClick={() => alert('Logout clicked')}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : 70,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : 70,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            bgcolor: '#1b1c2e',
            color: '#fff',
          },
        }}
        open={drawerOpen}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <Tooltip key={item.label} title={!drawerOpen ? item.label : ''} placement="right">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false); // 👉 Minimize sidebar after menu click
                }}
                sx={{ color: '#fff', '&:hover': { bgcolor: '#2e2f45' } }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {drawerOpen && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#f9fafc',
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/supplier" element={<SupplierManagement />} />
          <Route path="/reports" element={<ReportAnalysis />} />
          <Route path="/barcode" element={<BarcodeIntegration />} />
          <Route path="/security" element={<SecurityAccess />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MedicalDashboard;
