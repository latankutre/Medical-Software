import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';

import SupplierMaster from './SupplierMaster';
import PurchaseHistory from './PurchaseHistory';
import PaymentTracking from './PaymentTracking';

const SupplierManagement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSection, setActiveSection] = useState('add');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSectionSelect = (section) => {
    setActiveSection(section);
    handleMenuClose();
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'add':
        return <SupplierMaster />;
      case 'history':
        return <PurchaseHistory />;
      case 'payment':
        return <PaymentTracking />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#1A237E', borderRadius: 0, boxShadow: 2 }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            px: 2,
            py: isMobile ? 1 : 0,
            gap: isMobile ? 1 : 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              color: '#fff',
            }}
          >
            Supplier Management
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen} sx={{ alignSelf: 'flex-end' }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { width: 220, mt: 1, borderRadius: 2 } }}
              >
                <MenuItem
                  selected={activeSection === 'add'}
                  onClick={() => handleSectionSelect('add')}
                >
                  <ListItemIcon><AddBusinessIcon /></ListItemIcon>
                  <ListItemText primary="Add Supplier" />
                </MenuItem>
                <MenuItem
                  selected={activeSection === 'history'}
                  onClick={() => handleSectionSelect('history')}
                >
                  <ListItemIcon><HistoryIcon /></ListItemIcon>
                  <ListItemText primary="Purchase History" />
                </MenuItem>
                <MenuItem
                  selected={activeSection === 'payment'}
                  onClick={() => handleSectionSelect('payment')}
                >
                  <ListItemIcon><PaymentsIcon /></ListItemIcon>
                  <ListItemText primary="Payment Tracking" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box display="flex" gap={2}>
              <Button
                startIcon={<AddBusinessIcon />}
                onClick={() => handleSectionSelect('add')}
                variant={activeSection === 'add' ? 'contained' : 'text'}
                sx={{
                  bgcolor: activeSection === 'add' ? '#3949AB' : 'transparent',
                  color: '#fff',
                  '&:hover': { bgcolor: '#303F9F' },
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Add Supplier
              </Button>
              <Button
                startIcon={<HistoryIcon />}
                onClick={() => handleSectionSelect('history')}
                variant={activeSection === 'history' ? 'contained' : 'text'}
                sx={{
                  bgcolor: activeSection === 'history' ? '#3949AB' : 'transparent',
                  color: '#fff',
                  '&:hover': { bgcolor: '#303F9F' },
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Purchase History
              </Button>
              <Button
                startIcon={<PaymentsIcon />}
                onClick={() => handleSectionSelect('payment')}
                variant={activeSection === 'payment' ? 'contained' : 'text'}
                sx={{
                  bgcolor: activeSection === 'payment' ? '#3949AB' : 'transparent',
                  color: '#fff',
                  '&:hover': { bgcolor: '#303F9F' },
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Payment Tracking
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 3, px: isMobile ? 2 : 4, maxWidth: '100%' }}>
        {renderActiveSection()}
      </Container>
    </Box>
  );
};

export default SupplierManagement;
